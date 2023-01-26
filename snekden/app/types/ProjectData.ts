
export type ProjectStatus =  "handed over"| "maintenance" |  "actively_expanding" |"MVP" |"WIP" | "sketch" | "idea";

export type ProjectCardData = {
  title: string;
  subtitle: string;
  technologies: string[];
  link: string;
  status: ProjectStatus;
  description: string;
};
