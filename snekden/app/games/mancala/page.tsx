"use client";
// todo also do animations, if possible

import { useState } from "react";

type MancalaState = {
  ended: boolean;
  message: EndMessage;
  // todo add some state representation, maybe in WASM, maybe just here
};

type EndMessage = "you won" | "ai won" | "draw";

const name =
  "h-20 w-20 bg-cyan-600 m-3 grid flow-grid-row grid-rows-1 place-content-center ";

const startingState: MancalaState = {
  ended: false,
  message: "draw",
};

export default function Mancala() {
  const [state, setState] = useState(startingState);
  const [userTurn, setUserTurn] = useState(true);

  const handleUserMove: (state: MancalaState) => void = (state: MancalaState) => {
    setState(state);
    setUserTurn(false);
    // setTimeout(() => {
    //   const aiNewState: MancalaState = makeRandomMove(state);
    //   setState(aiNewState);
    //   setUserTurn(true);
    // }, 1000);
  };

  return (
    <div className="ml-96 w-fit h-96 m-10 p-4 grid grid-flow-col grid-cols-2  bg-cyan-800 shadow-lg">
      <GameWindow state={state} stateCallback={handleUserMove} active={userTurn} />
      <div id="scoreboard" className="bg-cyan-700">
        <h3 className="text-cyan-50">Player to go now:{userTurn ? 'you' : 'ai'}</h3>
      </div>
    </div>
  );
}

function GameWindow(props: { state: MancalaState, stateCallback: (state: MancalaState) => void; active: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div>
      {/* <div className="animate-spin w-20 h-20 text-2xl p-0 m-0  visible" style={{ zIndex: props.active ? 20 : 10 }}>
        &#9203;
      </div> */}
      <div
        id="mancalaContainer"
        className=" w-fit h-fit relative m-4 grid gap-2 grid-rows-2 bg-cyan-900   grid-flow-col"
      >
        <div id="boards" className="grid grid-flow-row h-fit grid-rows-2 bg-slate-500">
          <div className="topBoard w-[40rem] h-40 grid grid-flow-col grid-rows-2 gap-2 bg-slate-600">
            <div id="circle" className="rounded-full text-center text-slate-800 w-14 h-14 m-2 bg-cyan-200">
              <p className="inset-19">
                5
              </p>
            </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200">
              <button id="gem" className="w-4 h-4 bg-green-600 rounded-full">
              </button>
            </div>
            <div id="circle" className="rounded-full text-center text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
          </div>
          <div className="bottomBoard w-[40rem] h-40 grid grid-flow-col grid-rows-2 gap-2 bg-slate-400">
            <div id="circle" className="rounded-full text-center text-slate-800 w-14 h-14 m-2 bg-cyan-200">
              <p className="inset-19">
                5
              </p>
            </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
            <div id="circle" className="rounded-full text-center  text-slate-800 w-14 h-14 m-2 bg-cyan-200"> 5 </div>
          </div>
        </div>
      </div>
    </div>
  );
}
