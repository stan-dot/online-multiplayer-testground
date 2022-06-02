import React from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from "../../wrappers/Socket.wrapper";
import { rollDice } from "./utils/roll";
import { images } from "./constants";
import { Player } from "./Player";

export function SnakeGame(): JSX.Element {
  // todo must ensure game doesn't load if connection isn't there
  const socket: Socket = React.useContext(SocketContext)!;
  socket.emit("joined");
  let players: Player[] = [];
  let currentPlayer: Player;
  socket.on("restart", () => {
    window.location.reload();
  });

  function causeRestart() {
    socket.emit("restart");
  }

  // Listen for events
  socket.on("join", (data) => {
    handleJoin(data);
  });

  socket.on("joined", (data) => {
    data.forEach((player: { name: any; pos: any; img: any; }, index: any) => {
      players.push(new Player(index, player.name, player.pos, player.img));
      console.log(player);
    });
    drawPins();
  });

  function drawPins() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    players.forEach(player => player.draw(canvas, ctx));
  };
  const [currentPlayerStatus, setCurrentPlayerStatus] = React.useState("unknown state")
  const [currentDiceSource, setCurrentDiceSource] = React.useState('');
  socket.on("rollDice", (data, turn) => {
    players[data.id].updatePos(data.num);
    setCurrentDiceSource(`./images/dice/dice${data.num}.png`);
    drawPins(ctx, canvas, players);
    if (turn != currentPlayer.id) {
      ("roll-button").hidden = true;
      setCurrentPlayerStatus(`It's ${players[turn].name}'s turn`);
    } else {
      ("roll-button").hidden = false;
      setCurrentPlayerStatus(`It's your turn`);
    }

    let winner;
    for (let i = 0; i < players.length; i++) {
      if (players[i].pos == 99) {
        winner = players[i];
        break;
      }
    }
    if (winner) {
      reactToWinner(winner);
    }
  });

  function reactToWinner(winner: any) {
    setCurrentPlayerStatus(`${winner.name} has won!`);
    ("roll-button").hidden = true;
    ("dice").hidden = true;
    ("restart-btn").hidden = false;
  }

  function handleJoined(data: any) {

  }

  function handleJoin(data: any) {
    players.push(new Player(players.length, data.name, data.pos, data.img));
    drawPins();
  }
  function newFunction() {
    return <div id="players-box">
      <h3>Players currently online: </h3>
      <br />
      <table id="players-table">{
        players.map((player) => {
          return <tr><td>{player.name}</td><td><img src={player.img} height={50} width={40} /></td></tr>
        })
      } </table>
    </div>;
  }


  function handleStart() {
    const name = ("name").value;
    ("name").disabled = true;
    ("start-btn").hidden = true;
    ("roll-button").hidden = false;
    currentPlayer = new Player(players.length, name, 0, images[players.length]);
    setCurrentPlayerStatus(`Anyone can roll`);
    socket.emit("join", currentPlayer);
  }

  function handleRoll() {
    const num = rollDice();
    currentPlayer.updatePos(num);
    socket.emit("rollDice", {
      num: num,
      id: currentPlayer.id,
      pos: currentPlayer.pos,
    });
  }

  return <div className="board" >
    <img src="images/red_piece.png" alt="" hidden={true} id="red-piece" />
    <img src="images/blue_piece.png" alt="" hidden={true} id="blue-piece" />
    <img src="images/yellow_piece.png" alt="" hidden={true} id="yellow-piece" />
    <img src="images/green_piece.png" alt="" hidden={true} id="green-piece" />
    <div className="container" >
      <canvas id="canvas" > </canvas>
    </div>
    < div className="info-box" >
      <div className="form-group" >
        <input
          type="text"
          className="form-input"
          id="name"
          placeholder="Your name"
          required
        />
        <button className="btn draw-border" id="start-btn" > Join </button>
      </div>
    </div>
    {newFunction()}
    < div id="current-player" > </div>
    < button className="btn draw-border" id="roll-button" hidden={false} > Roll </button>
    < div className="dice" >
      <img src="./images/dice/dice1.png" alt="" id="dice" />
    </div>
    < button className="btn draw-border" id="restart-btn" hidden={false} > Restart </button>
  </div>
}


