import { Topic } from "../types/TopicTypes";

const topic1: Topic = {
  statements: [],
  metadata: {
    creatorsIds: [],
    confirmationPercent: 0,
    tags: [],
    triggerWarnings: [],
    question: "Should crabs fly?",
    imageUrl: undefined,
  },
};
const topic2: Topic = {
  statements: [],
  metadata: {
    creatorsIds: [],
    confirmationPercent: 0,
    tags: [],
    triggerWarnings: [],
    question: "Buffalo buffalo buffalo?",
    imageUrl: undefined,
  },
};
export const SAMPLE_TOPICS: Topic[] = [topic1, topic2];
