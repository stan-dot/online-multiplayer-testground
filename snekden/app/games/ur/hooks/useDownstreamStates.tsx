"use client";
import { STARTING_PIECES } from "../(logic)/machine";

type BackgroundDownstreamStates = {
  p1Undeployed: number;
  p1Finished: number;
  p2Undeployed: number;
  p2Finished: number;
};
export function useDownstreamStates(
  { state }: { state: any },
): BackgroundDownstreamStates {
  const p1State = state.context.p1assets;
  const p2State = state.context.p2assets;

  const p1Undeployed = p1State?.undeployed || 0;
  const p2Undeployed = p2State?.undeployed || 0;
  const p1Finished = STARTING_PIECES - p1Undeployed -
    (p1State?.pieces.length || 0);
  const p2Finished = STARTING_PIECES - p2Undeployed -
    (p2State?.pieces.length || 0);
  return { p1Undeployed, p1Finished, p2Undeployed, p2Finished };
}
