export type ImageObject = {
  url: string;
  afterWhichParagraph: number;
};
export type ArticleText = {
  title: string;
  subtitle: string;
  images: ImageObject[];
  paragraphs: string[];
};
export type ArticleToRead = {
  url: string;
  publicMetadata: PublicMetadata;
  metadata: ArticleMetadata;
  text?: ArticleText;
};
export type ArticleMetadata = {
  wordCount: number;
  liking: number;
  readDate: number;
  notes: number;
  readStatus: boolean;
  readWords: number;
};
export type UserMetadata = {
  wordsPerMinute: number;
  articles: ArticleToRead[];
  name: string;
};

export type PublicMetadata = {
  wordCount: number;
  views: number;
};

export type ArticleNote = {
  text: string;
  author: UserMetadata;
  wordStart: number;
  wordEnd: number;
};
