import React from "react";
import { Topic, TopicMetadata } from "../types/TopicTypes";

export function TopicCard(
  props: { topic: Topic; chooseCallback: (t: Topic) => void; }): JSX.Element {
  const metadata: TopicMetadata = props.topic.metadata;
  return (
    <div onClick={(e) => props.chooseCallback(props.topic)} style={{ overflow: 'scroll' }}>
      <div id="mainSection">
        <p>some background image: {metadata.imageUrl ?? "no url"}</p>
        <p>{metadata.question}</p>
        <p>tags - visual equivalents could be here too</p>
      </div>
      <div id="numbersSection">
        <p>size: {props.topic.statements.length}</p>
        <p>confirmation Percent {metadata.confirmationPercent}</p>
      </div>
      <div id="iconsSection">
        <p>creators - icons only, more on hover</p>
      </div>
    </div>
  );
}
