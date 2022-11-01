import React from "react";
import { Topic, TopicMetadata } from "../types/TopicTypes";

export function TopicCard(
  props: { topic: Topic; chooseCallback: (t: Topic) => void; }): JSX.Element {
  const metadata: TopicMetadata = props.topic.metadata;
  return (
    <div onClick={(e) => props.chooseCallback(props.topic)} style={{ overflow: 'scroll', width:'fit-content', minWidth:'250px' }}>
      <div id="mainSection">
        <p>{metadata.imageUrl ?? "no image url"}</p>
        <p>{metadata.question}</p>
        <div>
          <h5>Tags:</h5>
          {props.topic.metadata.tags.map((tag: string) => {
            return <span>{tag}</span>
          })}
        </div>
      </div>
      {/* <div id="numbersSection">
        <p>size: {props.topic.statements.length}</p>
        <p>confirmation Percent {metadata.confirmationPercent}</p>
      </div> */}
      {/* <div id="iconsSection">
        <p>creators - icons only, more on hover</p>
      </div> */}
    </div>
  );
}
