import React, { useState } from "react";
import { Topic, TopicMetadata } from "../types/TopicTypes";

export function TopicDropdown(
  props: { changeTopicCallback: (t: Topic) => void; },
): JSX.Element {
  const [topics, setTopics] = useState([] as Topic[]);
  const [topicListVisible, setTopicListVisible] = useState(true);

  // const topicsUrl: string = "http://localhost:3001/topics";
  // axios.get(topicsUrl).then((r: AxiosResponse) => {
  //   setTopics(r.data);
  // });
  return (
    <div id='alwaysOn' style={{ width: '150px', height:'80px' }}>
      <button onClick={() => topicListVisible ? setTopicListVisible(false) : setTopicListVisible(true)}>
        Show topic selection
      </button>
      {
        topicListVisible
        &&
        <div id="topicDropdown">
          {
            topics.length > 0 ?
              topics.map((t) => (
                <TopicCard topic={t} chooseCallback={props.changeTopicCallback} />
              ))
              :
              <p>Sorry, there's no other topics available!</p>
          }
          <a href={"https://github.com/stan-dot/online-multiplayer-testground"}>
            Read more
          </a>
        </div>
      }
    </div>
  )
}

function TopicCard(
  props: { topic: Topic; chooseCallback: (t: Topic) => void },
): JSX.Element {
  const metadata: TopicMetadata = props.topic.metadata;
  return (
    <div onClick={(e) => props.chooseCallback(props.topic)} style={{ overflow: 'scroll' }} >
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
