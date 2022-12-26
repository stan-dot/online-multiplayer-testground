import React, { useState } from "react";
import { fireNewTopicPopup } from "../components/alerts/TopicCreationPopup";
import { Topic } from "../types/TopicTypes";
import { SAMPLE_TOPICS } from "./SAMPLE_TOPICS";
import { TopicCard } from "./TopicCard";

function topicFromQuestion(q: string): Topic {
  const t: Topic = {
    statements: [],
    metadata: {
      creatorsIds: [],
      confirmationPercent: 0,
      tags: [],
      triggerWarnings: [],
      question: q,
      imageUrl: undefined,
    },
  };
  return t;
}

function throwAwayAddTopicMetaFunction(
  callback: React.Dispatch<React.SetStateAction<Topic[]>>,
  oldTopics: Topic[],
): any {
  return (topic: Topic) => callback(oldTopics.concat(topic));
}

export function TopicDropdown(
  props: { changeTopicCallback: (t: Topic) => void },
): JSX.Element {
  // const [topics, setTopics] = useState([] as Topic[]);
  const [topics, setTopics] = useState(SAMPLE_TOPICS);
  const [topicListVisible, setTopicListVisible] = useState(false);

  // const topicsUrl: string = "http://localhost:3001/topics";
  // axios.get(topicsUrl).then((r: AxiosResponse) => {
  //   setTopics(r.data);
  // });

  const closeCallback = () => {
    setTopicListVisible(false);
  }

  return (
    <div id="alwaysOn" style={{ width: "150px", height: "80px", zIndex: 10, }}>
      <button
        onClick={() =>
          topicListVisible
            ? setTopicListVisible(false)
            : setTopicListVisible(true)}
      >
        Show topic selection
      </button>
      {topicListVisible &&
        (
          <div id="topicDropdown" style={{ border: '2px solid #80ffff' }}>
            {topics.length > 0
              ? topics.map((t, i) => (
                <TopicCard
                  key={i}
                  topic={t}
                  chooseCallback={props.changeTopicCallback}
                  closeCallback={closeCallback}
                />
              ))
              : <p>Sorry, there's no other topics available!</p>}
            <button
              onClick={(e) => {
                fireNewTopicPopup(
                  topicFromQuestion,
                  throwAwayAddTopicMetaFunction(setTopics, topics),
                );
                console.log("clicked the create new button!");
              }}
            >
              Create new topic
            </button>
          </div>
        )}
    </div>
  );
}
