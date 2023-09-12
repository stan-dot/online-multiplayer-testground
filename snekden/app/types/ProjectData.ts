export type ProjectStatus =
  | "delivered"
  | "handed over"
  | "maintenance"
  | "actively expanding"
  | "MVP"
  | "WIP"
  | "sketch"
  | "idea"
  | "would like someday";

export type ProjectCardData = {
  title: string;
  subtitle: string;
  technologies: string[];
  link: string;
  status: ProjectStatus;
  description: string;
};
