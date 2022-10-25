export type Statement = {
  title: string;
  id: string;
  supportingChildren: Statement[];
  opposingChildren: Statement[];
};

export type TopicMetadata = {
  creatorsIds: string[];
  confirmationPercent: number;
  tags: string[];
  triggerWarnings: string[];
  question: string;
  imageUrl?: string;
};

export type Topic = {
  statements: Statement[];
  metadata: TopicMetadata;
};
