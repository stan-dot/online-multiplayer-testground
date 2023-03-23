// import type { AddModuleExports } from '../minesweeper_rust_lib/pkg';
import dynamic from "next/dynamic";

interface MinesweeperComponentProps {
  number: Number;
  updateCallback: (n: number) => void;
}

type MinesweperModuleExports = {
  getState: (a: number) => void;
  openField: (a: number, b: number) => void;
  toggleFlag: (a: number, b: number) => void;
  init: any;
};

const MinesweeperStateComponent = dynamic({
  loader: async () => {
    // Import the wasm module
    // @ts-ignore
    const exports = (await import(
      "../minesweeper_rust_lib/pkg/minesweeper_bg.wasm"
    )) as MinesweperModuleExports;
    console.log(exports);
    const { getState, openField, toggleFlag } = exports;
    // const start = await init();
    const state = getState(1);
    console.log(state);

    // Return a React component that calls the add_one method on the wasm module
    return ({
      number,
      updateCallback,
    }: MinesweeperComponentProps) => (
      <div>
        <button onClick={() => {}}>
          empty button
        </button>
        <div>
        </div>
        <p>prior value {number.toString()}</p>
      </div>
    );
  },
});

export default MinesweeperStateComponent;
