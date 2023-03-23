// import type { AddModuleExports } from '../minesweeper_rust_lib/pkg';
import dynamic from "next/dynamic";

interface RustComponentProps {
  number: Number;
  updateCallback: (n: number) => void;
}

const AddOneComponent = dynamic({
  loader: async () => {
    // Import the wasm module
    // @ts-ignore
    const exports = (await import("../add.wasm")) as AddModuleExports;
    const { add_one: addOne } = exports;

    // Return a React component that calls the add_one method on the wasm module
    return ({
      number,
      updateCallback,
    }: RustComponentProps) => (
      <div>
        <button
          onClick={() => {
            const newNumber = addOne(number);
            updateCallback(newNumber);
          }}
        >
          click me to increase
        </button>
        <p>prior value {number.toString()}</p>
      </div>
    );
  },
});

export default AddOneComponent;
