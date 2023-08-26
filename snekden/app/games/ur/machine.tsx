import { assign, createMachine, interpret, Interpreter } from "xstate";
import { PieceProps } from "./(components)/Piece";

interface PlayerAssets {
  pieces: PieceProps[];
  undeployed: number;
}

export interface UrContext {
  p1assets: PlayerAssets;
  p2assets: PlayerAssets;
}

const STARTING_PIECES = 7;

const INITIAL_CONTEXT: UrContext = {
  p1assets: {
    pieces: [],
    undeployed: STARTING_PIECES,
  },
  p2assets: {
    pieces: [],
    undeployed: STARTING_PIECES,
  },
};

interface DeployEvent {
  type: "DEPLOY";
  squares: number;
  player: "1" | "2";
}

interface FinishEvent {
  type: "FINISH";
  squares: number;
  player: "1" | "2";
}

function checkIfWon(assets: PlayerAssets): boolean {
  return assets.pieces.length === 0 && assets.undeployed === 0;
}

// have a finite state for initative and loading
// wait for p1 state
// wait for p2 state
// p1 roll state
// p2 roll state
// all pretty plain

type UrEvents = DeployEvent | FinishEvent;

// states - clicked not yet moved, p1, p2
export const urMachine = createMachine<UrContext, UrEvents>({
  /** @xstate-layout N4IgpgJg5mDOIC5QFcBOBZAhgYwBYEsA7MAOnwgBswBiAMQFEAVAYQAkBtABgF1FQAHAPax8AF3yDCfEAA9EARgCsAJhIB2ACydtijQE4AzPIBsW4wBoQAT0TLlekhoAcizvOWddGjQYPGAvv6WaFh4RKQUgpgQRFDUAEr0AMoA8gAyAGr0XLxIIEIi4pLScggGapwkylpuRnaKik4W1gqKaiR6TsquahWKxk5OzoHBGDgExCSR0bEJ9ABS9MyMOdIFYhJSeaVKqpranvpGppzNNghO8o5OB779hn4jICHj4SSwyNjYcLDU9ABuYEIogABPJVnl1kUtqBSsYDIoSH5XB41Ip5HpFEZLOclO1Ot1OL1PAMhk4ni8wpMAGaYfAUNA0RKMeIATQhAmEG2K21aexqh0MJjMOIURg6AuM3WM8k4COUgSCIEIgggcGklImYDWXOhJUQAFozoaAkrNW9yFQdYVNvqEBplKKEHYHHoKm5lMZTGo9PoFWaxlSIlEYoQoNbuTDZLZTCRXAc1FLDL6sU6lE5HMY0ZwnMdODUNBTA1r3p9vrB4JDdbbefbDCQpa5do01E49Kc020qvUiRpEzcvYWA6ES7T6YyI3raw6nU52rovRU9PI-Hok0WR29iAB3EGwUSYURgMGTmuwxCaREubTKFdSgz5tSdjMaLOuXMmfPaIeBIA */
  id: "urMachine",
  initial: Math.random() < 0.5 ? "p1Roll" : "p2Roll",
  context: INITIAL_CONTEXT,
  schema: {
    events: {} as DeployEvent,
  },

  states: {
    p1Roll: {
      on: {
        "DEPLOY": "p1Deploy",
      },
    },
    p1Deploy: {
      on: {},
    },
    p1Move: {
      on: {},
    },
    endgame: {
      type: "final",
      entry: "logResult",
    },
    p2Roll: {
      on: {
        "DEPLOY": "p2Deploy",
      },
    },
    p2Deploy: {
      on: {},
    },
    p2Move: {
      on: {},
    },
    "you won": {},
  },
}, {
  actions: {
    logResult: () => console.log("entered that state"),
    deploy: () =>
      assign({
        p1assets: (context: UrContext, event: DeployEvent) => {
          const newPiece: PieceProps = {
            color: "",
            position: event.squares,
          };

          return {
            ...context.p1assets,
            pieces: [...context.p1assets.pieces, newPiece],
          };
        },
      }),
  },
});
