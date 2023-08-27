


export default function MachineDisplay() {
  return <div id="machineContainer" className="w-4/5 h-4/5 m-2 bg-slate-400">
    <div id="boardContainer" className="border-red-500 border-solid border-1">

    </div>
  </div>
}

function Square(props: { rosetta: boolean, pieces: any, empty: boolean }) {
  return <div className={"h-20 w-20 bg-cyan-600 m-3 grid flow-grid-row grid-rows-1 place-content-center "} >
    <p className="text-4xl p-2 m-2 text-cyan-100">
      {props.pieces}
    </p>
  </div>
}