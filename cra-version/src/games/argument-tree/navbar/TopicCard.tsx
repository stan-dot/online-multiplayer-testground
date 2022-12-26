import React from "react";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Topic, TopicMetadata } from "../types/TopicTypes";

export function TopicCard(
  props: {
    topic: Topic; chooseCallback: (t: Topic) => void;
    closeCallback: () => void
  }): JSX.Element {
  const metadata: TopicMetadata = props.topic.metadata;
  const clickHandler = (e: React.MouseEvent) => {
    Swal.fire('Do you want to change the topic?', 'Are you sure?', 'question').then((v: SweetAlertResult<boolean>) => {
      if (v.isConfirmed) {
        props.chooseCallback(props.topic)
        props.closeCallback();

      }
    }
    )
  };
  return (
    <div style={{
      overflow: 'scroll', width: 'fit-content', minWidth: '250px'
    }
    }>
      <div id="mainSection">
        <p>{metadata.imageUrl ?? "no image url"}</p>
        <p>{metadata.question}</p>
        <p>size:{props.topic.statements.length}</p>
        <button onClick={clickHandler}>
          Change into this topic
        </button>
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
    </div >
  );
}
