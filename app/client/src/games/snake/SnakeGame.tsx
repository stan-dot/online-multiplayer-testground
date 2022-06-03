import React, { useEffect, useState } from "react";
import { images, LAST_SQUARE } from "./constants";
import { Player } from "./Player";
import { PlayersBox } from "./PlayerBox";
import { readContext } from "./readContext";
import { rollDice } from "./utils/roll";
import "./styles.css";
export default function SnakeGame(): JSX.Element {
  // todo might change this context to be moved into a simple prop, and that prop as ComponentType<Game>
  const { socket, renderingContext, canvas } = readContext();
  const [inputUsername, setInputUsername] = useState("anonymous");
  const [currentPlayerStatus, setCurrentPlayerStatus] = useState("Wait or click to join")
  const [currentDiceNumber, setCurrentDiceSource] = useState('6');
  const [rollButtonVisiblity, setRollButtonVisiblity] = useState(false);
  const [diceVisibility, setDiceVisibility] = useState(false);
  const [restartButtonVisibility, setRestartButtonVisibility] = useState(true);
  const [nameDisabled, setNameDisabled] = useState(false);
  const [startButtonVisibility, setStartButtonVisibility] = useState(true);
  const [players, setPlayers] = useState([] as Player[]);
  function appendToPlayers(p: Player): void {
    setPlayers(players.concat([p]));
  }
  // MAIN CODE
  let currentPlayer: Player;

  // SOCKET HANDLING
  socket.on("restart", () => {
    window.location.reload();
  });

  function causeRestart() {
    socket.emit("restart");
  }

  useEffect(() => {
    drawPins()
  }, [currentDiceNumber, players, currentPlayerStatus]);

  socket.on("join", (data) => {
    // todo solve the multiple rendering problem
    // todo alternatively, move to other tasks
    const newPlayer = new Player(players.length, data.name, data.pos, data.img);
    if (!players.find(player => player.id === newPlayer.id)) {
      appendToPlayers(newPlayer);
      console.log('joining, players: ', players);
    }
  });

  socket.on("joined", (data) => {
    console.log('data:', data);
    data.forEach((player: { name: any; pos: any; img: any; }, index: any) => {
      appendToPlayers(new Player(index, player.name, player.pos, player.img));
      console.log(player);
    });
  });

  socket.on("rollDice", (data, turn) => {
    players[data.id].updatePos(data.num);
    setCurrentDiceSource(data.num);
    if (turn !== currentPlayer.id) {
      setRollButtonVisiblity(false);
      setCurrentPlayerStatus(`It's ${players[turn].name}'s turn`);
    } else {
      setRestartButtonVisibility(true);
      setCurrentPlayerStatus(`It's your turn`);
    }
    const winner: Player | undefined = players.find(player => player.pos === LAST_SQUARE);
    winner && reactToWinner(winner);
  });

  // CANVAS EXECUTION
  function drawPins() {
    console.log('starts drawing');
    renderingContext.clearRect(0, 0, canvas.width, canvas.height);
    players.forEach(player => player.draw(canvas, renderingContext));
  };

  // STATE HANDLING
  function reactToWinner(winner: Player) {
    setCurrentPlayerStatus(`${winner.name} has won!`);
    setRollButtonVisiblity(false);
    setDiceVisibility(false);
    setRestartButtonVisibility(true);
  }

  function handleStart() {
    if (inputUsername !== '') {
      socket.emit("joined");
      setNameDisabled(true);
      setStartButtonVisibility(false);
      setRollButtonVisiblity(true);
      currentPlayer = new Player(players.length, inputUsername, 0, images[players.length]);
      setCurrentPlayerStatus(`Anyone can roll`);
      socket.emit("join", currentPlayer);
      console.log('current playing joins: ', currentPlayer);
    }
  }

  function handleRoll() {
    const num = rollDice();
    currentPlayer.updatePos(num);
    setCurrentDiceSource(num.toString());
    socket.emit("rollDice", {
      num: num,
      id: currentPlayer.id,
      pos: currentPlayer.pos,
    });
  }

  // RENDERING
  return <div className="boardContainer"  >
    <div className="board" />
    {images.map((path: string, index: number) => {
      return <img src={path} alt="" hidden={players[index] !== null} id={path.split("/")[2] ?? 'unknown'} />
    })}
    <div className="container" >
      <canvas id="canvas" > </canvas>
    </div>
    < div className="info-box" >
      <div className="form-group" >
        <input
          type="text"
          className="form-input"
          id="name"
          placeholder={inputUsername}
          required
          disabled={nameDisabled}
          onChange={(e => setInputUsername(e.target.value))}
        />
        <button
          className="btn draw-border"
          id="start-btn"
          hidden={!startButtonVisibility}
          onClick={() => handleStart()}>
          Join
        </button>
      </div>
    </div>
    <PlayersBox players={players} />
    < div id="current-player" > {currentPlayerStatus}</div>
    < button
      className="btn draw-border"
      id="roll-button"
      hidden={!rollButtonVisiblity}
      onClick={() => handleRoll()}>
      Roll
    </button>
    < div className="dice" hidden={!diceVisibility} >
      <img src={`./images/dice/dice${currentDiceNumber}.png`} alt="" id="dice" />
    </div>
    < button
      className="btn draw-border"
      id="restart-btn"
      hidden={!restartButtonVisibility}
      onClick={() => causeRestart()}>
      Restart
    </button>
  </div >
}


