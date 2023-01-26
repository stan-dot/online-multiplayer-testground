
export type ProjectStatus = "WIP" | "MVP" | "actively_expanding" | "sketch" | "idea";


export type ProjectCardData = {
  title: string;
  subtitle: string;
  technologies: string[];
  link: string;
  status: ProjectStatus;
  description: string;
};
