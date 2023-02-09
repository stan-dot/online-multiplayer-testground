import { createMachine, assign } from "xstate";

interface ToggleContext {
  count: number;
}
type ToggleEvents = { type: "TOGGLE"; };
export const toggleMachine = createMachine<ToggleContext, ToggleEvents>({
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
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" }
    }
  },
  predictableActionArguments: true
});
