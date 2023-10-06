import { actions, assign, createMachine, interpret, Interpreter } from "xstate";
import { PieceProps } from "../(components)/Piece";
import { MoveEvent, PlayerAssets, RollEvent, UrContext } from "./types";
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

function checkIfWon(assets: PlayerAssets): boolean {
  return assets.pieces.length === 0 && assets.undeployed === 0;
}

// 1-4 and 13-14 are safe
function excludeConflict(pieces: PieceProps[]): PieceProps[] {
  return pieces.filter((v) =>
    v.position <= 4 && v.position >= 13 && v.position !== 8
  );
}

function checkIfSelfBlocked(ownAssets: PlayerAssets, final: number): boolean {
  if (ownAssets.pieces.find((v) => v.position === final)) return true;
  return false;
}

function checkIfTakeOpponentAssets(
  opponentAssets: PlayerAssets,
  final: number,
): boolean {
  const conflictingPieces = excludeConflict(opponentAssets.pieces);
  if (conflictingPieces.find((v) => v.position === final)) return true;
  return false;
}

// 4 8 14 give extra move
const bonusMoveIndexes: number[] = [4, 8, 14];
function checkIfNewMove(final: number): boolean {
  return bonusMoveIndexes.includes(final);
}

interface StartEvent {
  type: "START";
  player: "1" | "2";
}

interface ExtraMoveEvent {
  type: "EXTRA_MOVE";
}

interface PieceTakenEvent {
  type: "PIECE_TAKEN";
}

interface WonEvent {
  type: "WON";
}

type UrEvents =
  | RollEvent
  | MoveEvent
  | StartEvent
  | ExtraMoveEvent
  | PieceTakenEvent
  | WonEvent;

export const urMachine = createMachine<UrContext, UrEvents>({
  /** @xstate-layout N4IgpgJg5mDOIC5QFcBOBZAhgYwBYEsA7MAOnwgBswBiAMQFEAVAYQAkBtABgF1FQAHAPax8AF3yDCfEAA9EARgCsAJhIB2ACydtijQE4AzPIBsW4wBoQAT0TLlekhoAcizvOWddGjQYPGAvv6WaFh4RKQUgpgQRFDUAEr0AMoA8gAyAGr0XLxIIEIi4pLScggGapwkylpuRnaKik4W1gqKaiR6TsquahWKxk5OzoHBGDgExCSR0bEJ9ABS9MyMOdIFYhJSeaVKqpranvpGppzNNghO8o5OB779hn4jICHj4SSwyNjYcLDU9ABuYEIogABPJVnl1kUtqBSsYDIoSH5XB41Ip5HpFEZLOclO1Ot1OL1PAMhk4ni8wpMAGaYfAUNA0RKMeIATQhAmEG2K21aexqh0MJjMOIURg6AuM3WM8k4COUgSCIEIgggcGklImYDWXOhJUQAFozoaAkrNW9yFQdYVNvqEBplKKEHYHHoKm5lMZTGo9PoFWaxlSIlEYoQoNbuTDZLZTCRXAc1FLDL6sU6lE5HMY0ZwnMdODUNBTA1r3p9vrB4JDdbbefbDCQpa5do01E49Kc020qvUiRpEzcvYWA6ES7T6YyI3raw6nU52rovRU9PI-Hok0WR29iAB3EGwUSYURgMGTmuwxCaREubTKFdSgz5tSdjMaLOuXMmfPaIeBIA */
  id: "urMachine",
  initial: "loading",
  context: INITIAL_CONTEXT,
  predictableActionArguments: true,
  states: {
    loading: {
      on: {
        START: [
          {
            cond: "randomizeStart",
            target: "p1Roll",
          },
          {
            target: "p2Roll",
          },
        ],
      },
    },
    p1Roll: {
      on: {
        ROLL: {
          cond: "nonZeroMove",
          target: "p1Move",
        },
      },
    },
    p1Move: {
      on: {
        MOVE: [
          {
            cond: "blockedMove",
            actions: "logresult",
            target: "p1Move",
          },
          {
            cond: "bounce",
            actions: "logresult",
            target: "p1Move",
          },
          {
            cond: "finishingWithPiece",
            actions: "p1Finish",
            target: "p1Move",
          },
          {
            cond: "blockedMove",
            actions: "logresult",
            target: "p1Move",
          },
          {
            cond: "startingMove",
            actions: "p1Deploy",
            target: "p1Move",
          },
        ],
      },
    },
    p1Consequences: {
      on: {
        EXTRA_MOVE: { target: "p1Roll", actions: "logresult" },
        PIECE_TAKEN: "p2Roll",
        WON: "endgame",
      },
    },
    p2Roll: {
      on: {
        ROLL: "p2Move",
      },
    },
    p2Move: {
      on: {},
    },
    p2Consequences: {
      on: {
        EXTRA_MOVE: "p2Roll",
        PIECE_TAKEN: "p1Roll",
        WON: "endgame",
      },
    },
    endgame: {
      type: "final",
      entry: "logResult",
    },
  },
}, {
  actions: {
    logResult: () => console.log("entered that state"),
    p1Deploy: () =>
      assign({
        p1assets: (context: UrContext, event: MoveEvent) => {
          const newPiece: PieceProps = {
            position: event.finalSquare,
          };

          return {
            ...context.p1assets,
            undeployed: context.p1assets.undeployed - 1,
            pieces: [...context.p1assets.pieces, newPiece],
          };
        },
      }),
    p1Finish: () =>
      assign({
        p1assets: (context: UrContext, event: MoveEvent) => {
          return {
            ...context.p1assets,
            pieces: context.p1assets.pieces.filter((v) =>
              v.position !== event.startingSquare
            ),
          };
        },
      }),
    p2Deploy: () =>
      assign({
        p2assets: (context: UrContext, event: MoveEvent) => {
          const newPiece: PieceProps = {
            position: event.finalSquare,
          };

          return {
            ...context.p2assets,
            undeployed: context.p2assets.undeployed - 1,
            pieces: [...context.p2assets.pieces, newPiece],
          };
        },
      }),
    p2Finish: () =>
      assign({
        p1assets: (context: UrContext, event: MoveEvent) => {
          return {
            ...context.p2assets,
            pieces: context.p2assets.pieces.filter((v) =>
              v.position !== event.startingSquare
            ),
          };
        },
      }),
  },
  guards: {
    blockedMove: (context: UrContext, event: MoveEvent) => {
      if (event.player === "1") {
        return checkIfSelfBlocked(context.p1assets, event.finalSquare);
      }
      if (event.player === "2") {
        return checkIfSelfBlocked(context.p2assets, event.finalSquare);
      }
      return false;
    },
    startingMove: (context: UrContext, event: MoveEvent) => {
      return event.startingSquare === 0;
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
    anotherMove: (context: UrContext, event: MoveEvent) => {
      return checkIfNewMove(event.finalSquare);
    },
    p1Won: (context: UrContext) => {
      return checkIfWon(context.p1assets);
    },
    p2Won: (context: UrContext) => {
      return checkIfWon(context.p2assets);
    },
    randomizeStart: () => {
      return Math.random() < 0.5;
    },
  },
});
