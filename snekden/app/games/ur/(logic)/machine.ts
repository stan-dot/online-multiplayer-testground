import { assign, createMachine, interpret, Interpreter } from "xstate";
import { PieceProps } from "../(components)/Piece";


interface PlayerAssets {
  pieces: PieceProps[];
  color: string;
  undeployed: number;
}

export interface UrContext {
  p1assets: PlayerAssets;
  p2assets: PlayerAssets;
}

export const STARTING_PIECES = 7;

const INITIAL_CONTEXT: UrContext = {
  p1assets: {
    pieces: [],
    color: "#ff0000",
    undeployed: STARTING_PIECES,
  },
  p2assets: {
    pieces: [],
    color: "#00ff00",
    undeployed: STARTING_PIECES,
  },
};

interface RollEvent {
  type: "ROLL";
  result: number;
  player: "1" | "2";
}

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

interface MoveEvent {
  type: "MOVE";
  startingSquare: number;
  finalSquare: number;
  player: "1" | "2";
}

function checkIfWon(assets: PlayerAssets): boolean {
  return assets.pieces.length === 0 && assets.undeployed === 0;
}

// 1-4 and 13-14 are safe
function excludeConflict(pieces: PieceProps[]): PieceProps[] {
  return pieces.filter((v) => v.position <= 4 && v.position >= 13);
}

// todo add whose movement it is

// final must be 15, then trigger - one of 3 events - bounces or goes off into finish

function checkIfSelfBlocked(ownAssets: PlayerAssets, final: number): boolean {
  if (ownAssets.pieces.find((v) => v.position === final)) return true;
  return false;
}

function checkIfTakeOpponentAssets(
  opponentAssets: PlayerAssets,
  final: number,
): boolean {
  if (opponentAssets.pieces.find((v) => v.position === final)) return true;
  return false;
}

// 4 8 14 give extra move
const bonusMoveIndexes: number[] = [4, 8, 14];
function checkIfNewMove(final: number): boolean {
  return bonusMoveIndexes.includes(final);
}

type UrEvents = DeployEvent | FinishEvent | RollEvent | MoveEvent;

// todo consider eliminating deploy and finish events, but just add different guards
// todo consider inital starting screen
export const urMachine = createMachine<UrContext, UrEvents>({
  /** @xstate-layout N4IgpgJg5mDOIC5QFcBOBZAhgYwBYEsA7MAOnwgBswBiAMQFEAVAYQAkBtABgF1FQAHAPax8AF3yDCfEAA9EARgCsAJhIB2ACydtijQE4AzPIBsW4wBoQAT0TLlekhoAcizvOWddGjQYPGAvv6WaFh4RKQUgpgQRFDUAEr0AMoA8gAyAGr0XLxIIEIi4pLScggGapwkylpuRnaKik4W1gqKaiR6TsquahWKxk5OzoHBGDgExCSR0bEJ9ABS9MyMOdIFYhJSeaVKqpranvpGppzNNghO8o5OB779hn4jICHj4SSwyNjYcLDU9ABuYEIogABPJVnl1kUtqBSsYDIoSH5XB41Ip5HpFEZLOclO1Ot1OL1PAMhk4ni8wpMAGaYfAUNA0RKMeIATQhAmEG2K21aexqh0MJjMOIURg6AuM3WM8k4COUgSCIEIgggcGklImYDWXOhJUQAFozoaAkrNW9yFQdYVNvqEBplKKEHYHHoKm5lMZTGo9PoFWaxlSIlEYoQoNbuTDZLZTCRXAc1FLDL6sU6lE5HMY0ZwnMdODUNBTA1r3p9vrB4JDdbbefbDCQpa5do01E49Kc020qvUiRpEzcvYWA6ES7T6YyI3raw6nU52rovRU9PI-Hok0WR29iAB3EGwUSYURgMGTmuwxCaREubTKFdSgz5tSdjMaLOuXMmfPaIeBIA */
  id: "urMachine",
  initial: Math.random() < 0.5 ? "p1Roll" : "p2Roll",
  context: INITIAL_CONTEXT,
  states: {
    p1Roll: {
      on: {},
    },

    p1Move: {
      on: {},
    },

    p2Roll: {
      on: {},
    },
    p2Move: {
      on: {},
    },
    endgame: {
      type: "final",
      entry: "logResult",
    },
  },
}, {
  actions: {
    logResult: () => console.log("entered that state"),
    p1deploy: () =>
      assign({
        p1assets: (context: UrContext, event: DeployEvent) => {
          const newPiece: PieceProps = {
            position: event.squares,
          };

          return {
            ...context.p1assets,
            undeployed: context.p1assets.undeployed - 1,
            pieces: [...context.p1assets.pieces, newPiece],
          };
        },
      }),
    p2deploy: () =>
      assign({
        p2assets: (context: UrContext, event: DeployEvent) => {
          const newPiece: PieceProps = {
            position: event.squares,
          };

          return {
            ...context.p2assets,
            undeployed: context.p2assets.undeployed - 1,
            pieces: [...context.p2assets.pieces, newPiece],
          };
        },
      }),
  },
  guards: {
    spaceFree: (context: UrContext, event: MoveEvent) => {
      return checkIfSelfBlocked(context, event.finalSquare);
    },
    // move goes to the opponent
    nonZeroMove: (context: UrContext, event: RollEvent) => {
      return event.result === 0;
    },
    // should redirect to choose move state
    bounce: (context: UrContext, event: MoveEvent) => {
      return event.finalSquare >= 15;
    },
    finishingWithPiece: (context: UrContext, event: MoveEvent) => {
      return event.finalSquare === 15;
    },
    p1Won: (context: UrContext) => {
      return checkIfWon(context.p1assets);
    },
    p2Won: (context: UrContext) => {
      return checkIfWon(context.p2assets);
    },
  },
});
