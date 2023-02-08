import { useMachine } from "@xstate/react";
import { assign, ContextFrom, createMachine } from "xstate";
// https://codesandbox.io/s/xstate-react-template-3t2tg?file=/src/styles.css

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      entry: assign({ count: (ctx: any) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" }
    }
  }
});

export default function Toggler() {
  const [state, send] = useMachine(toggleMachine);
  const active = state.matches("active");
  const { count } = state.context;

  return (
    <div className="App content-center ">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button className="p-1" onClick={() => send("TOGGLE")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}

