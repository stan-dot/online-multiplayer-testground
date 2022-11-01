import React, { useState } from "react";
import { Topic } from "../types/TopicTypes";
import { TopicCard } from "./TopicCard";

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
    <div id='alwaysOn' style={{ width: '150px', height: '80px' }}>
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
        </div>
      }
    </div>
  )
}


