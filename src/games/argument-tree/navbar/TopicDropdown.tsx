import React, { useState } from "react";
import { Topic, TopicMetadata } from "../types/TopicTypes";

/**
 * this is not for topic exploration, that could be on the landing page
 * @param props
 * @returns
 */
export function TopicDropdown(
  props: { changeTopicCallback: (t: Topic) => void },
): JSX.Element {
  const [topics, setTopics] = useState([] as Topic[]);

  // const topicsUrl: string = "http://localhost:3001/topics";
  // axios.get(topicsUrl).then((r: AxiosResponse) => {
  //   setTopics(r.data);
  // });
  return (
    <div>
      {topics.map((t) => (
        <TopicCard topic={t} chooseCallback={props.changeTopicCallback} />
      ))}
      <a href={"https://github.com/stan-dot/online-multiplayer-testground"}>
        Read more
      </a>
    </div>
  );
}

function TopicCard(
  props: { topic: Topic; chooseCallback: (t: Topic) => void },
): JSX.Element {
  const metadata: TopicMetadata = props.topic.metadata;
  return (
    <div onClick={(e) => props.chooseCallback(props.topic)}>
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
