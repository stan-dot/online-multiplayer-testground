import { CanvasDisplayParameters } from "./CanvasDisplayParameters";
import { Statement, Topic, TopicMetadata } from "./types/TopicTypes";

export const addNewStatement = (callback: Function, data: Topic): (s: Statement) => void => {
  const newF: (s: Statement) => void = (s: Statement) => {
    const changedArray: Statement[] = data.statements.concat(s);
    const newMetadata: TopicMetadata = {
      creatorsIds: data.metadata.creatorsIds.concat('me'),
      confirmationPercent: data.metadata.confirmationPercent,
      tags: data.metadata.tags,
      triggerWarnings: data.metadata.triggerWarnings,
      question: data.metadata.question
    };
    callback({
      statements: changedArray,
      metadata: newMetadata,
    });
  };
  return newF;
};

export const deleteStatement = (callback: Function, data: Topic): (s: Statement) => void => {
  const newF: (s: Statement) => void = (s: Statement) => {
    const id = s.id;
    const clearArray: Statement[] = data.statements.filter((s) => s.id !== id);
    callback({
      statements: clearArray,
      metadata: data.metadata,
    });
  };
  return newF;
};

export const updateStatement = (callback: Function, data: Topic): (s: Statement) => void => {
  const newF: (s: Statement) => void = (s: Statement) => {
    const changedArray: Statement[] = data.statements.map((v) => v.id === s.id ? s : v
    );
    callback({
      statements: changedArray,
      metadata: data.metadata,
    });
  };
  return newF;
};

export function getLargestId(list: Statement[]): string {
  return list.reduce((previous: Statement, current: Statement) => parseInt(current.id) > parseInt(previous.id) ? current : previous
  ).id;
}

export function getCanvasDimensions(
  leftPanelOn: boolean,
  rightPanelOn: boolean): CanvasDisplayParameters {
  const r: CanvasDisplayParameters = {
    startLeft: 45 + (leftPanelOn ? 200 : 0),
    startTop: 170,
    width: 1200 + (leftPanelOn ? 0 : 200) +
      (rightPanelOn ? 0 : 300),
    height: 800 + (leftPanelOn ? 0 : 200) +
      (rightPanelOn ? 0 : 300),
  };

  return r;
}
