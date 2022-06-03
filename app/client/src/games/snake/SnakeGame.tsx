import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from "../../wrappers/Socket.wrapper";
import { rollDice } from "./utils/roll";
import { images, LAST_SQUARE } from "./constants";
import { Player } from "./Player";
import { PlayersBox } from "./PlayerBox";
import { GameContext, GameContextType } from "../../types/GameContextType";

export default function SnakeGame(): JSX.Element {
  const gameInterface: GameContextType = React.useContext(GameContext)!;
  const renderingContext: CanvasRenderingContext2D = gameInterface.canvasContext?.renderingContext!;
  const canvas: HTMLCanvasElement = gameInterface.canvasContext?.canvas!;
  const socket: Socket = gameInterface.socketInterface!;

  const [currentPlayerStatus, setCurrentPlayerStatus] = React.useState("Wait or click to join")
  const [currentDiceNumber, setCurrentDiceSource] = React.useState('0');
  const [rollButtonVisiblity, setRollButtonVisiblity] = useState(false);
  const [diceVisibility, setDiceVisibility] = useState(false);
  const [restartButtonVisibility, setRestartButtonVisibility] = useState(true);
  const [nameDisabled, setNameDisabled] = React.useState(false);
  const [startButtonVisibility, setStartButtonVisibility] = React.useState(true);
  // MAIN CODE
  socket?.emit("joined");
  let players: Player[] = [];
  let currentPlayer: Player;

  handleStart();

  // SOCKET HANDLING
  socket.on("restart", () => {
    window.location.reload();
  });

  function causeRestart() {
    socket.emit("restart");
  }

  socket.on("join", (data) => {
    players.push(new Player(players.length, data.name, data.pos, data.img));
    drawPins();
  });

  socket.on("joined", (data) => {
    data.forEach((player: { name: any; pos: any; img: any; }, index: any) => {
      players.push(new Player(index, player.name, player.pos, player.img));
      console.log(player);
    });
    drawPins();
  });

  function drawPins() {
    renderingContext.clearRect(0, 0, canvas.width, canvas.height);
    players.forEach(player => player.draw(canvas, renderingContext));
  };

  socket.on("rollDice", (data, turn) => {
    players[data.id].updatePos(data.num);
    setCurrentDiceSource(data.num);
    drawPins();
    if (turn != currentPlayer.id) {
      setRollButtonVisiblity(false);
      setCurrentPlayerStatus(`It's ${players[turn].name}'s turn`);
    } else {
      setRestartButtonVisibility(true);
      setCurrentPlayerStatus(`It's your turn`);
    }
    const winner: Player | undefined = players.find(player => player.pos === LAST_SQUARE);
    winner && reactToWinner(winner);
  });

  // STATE HANDLING
  function reactToWinner(winner: Player) {
    setCurrentPlayerStatus(`${winner.name} has won!`);
    setRollButtonVisiblity(false);
    setDiceVisibility(false);
    setRestartButtonVisibility(true);
  }

  function handleStart() {
    setNameDisabled(true);
    setStartButtonVisibility(false);
    setRollButtonVisiblity(true);
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
          disabled={nameDisabled}
        />
        <button className="btn draw-border" id="start-btn" hidden={!startButtonVisibility}> Join </button>
      </div>
    </div>
    <PlayersBox players={players} />
    < div id="current-player" > {currentPlayerStatus}</div>
    < button className="btn draw-border" id="roll-button" hidden={!rollButtonVisiblity} onClick={handleRoll}> Roll </button>
    < div className="dice" hidden={!diceVisibility} >
      <img src={`./images/dice/${currentDiceNumber}.png`} alt="" id="dice" />
    </div>
    < button className="btn draw-border" id="restart-btn" hidden={!restartButtonVisibility} onClick={causeRestart}> Restart </button>
  </div>
}


