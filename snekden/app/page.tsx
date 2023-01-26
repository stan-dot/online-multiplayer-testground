import "../styles/globals.css";
import ProjectCard from "./(components)/ProjectCard";
import { ProjectCardData } from "./types/ProjectData";

const elizaProject: ProjectCardData = {
  title: "ElizaChatbot",
  subtitle: "A replica of the 1960s NLP program",
  technologies: ["NLP"],
  link: "./games/eliza",
  status: "WIP",
  description: "a recreation of the 60s program with a textual interface and limited memory."
};

const doneProjects: ProjectCardData[] = [elizaProject];
const ongoingProjects: ProjectCardData[] = [];
const futureProjects: ProjectCardData[] = [];

export default function HomePage() {
  return (
    <main className="max-w-4cl mx-auto sm:scroll-smooth">
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <h2>Past projects</h2>
        <CollectionProjects projects={doneProjects} />
      </section>
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <h2>Ongoing projects</h2>
        <CollectionProjects projects={ongoingProjects} />
      </section>
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <h2>Future projects</h2>
        <CollectionProjects projects={futureProjects} />
      </section>
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between resize">
        <h2>The kind of work I&apos;m after</h2>
        <p>I&apos;m looking for work that will let me showcase my full stack skills, if they are </p>
      </section>
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between resize">
        <h2>5 years time plan</h2>
        <p>to have most of my current projects completed, having transformed at least one of them into something a million people uses.</p>
        <p>I&apos;d be grateful if one of them became my main job, but that might not be in the cards.</p>
        <p>Working on only that that you want to work is a luxury. I plan to attain it.</p>
        <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      </section>
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
    </main>
  );
}



function CollectionProjects(props: { projects: ProjectCardData[] }) {
  if (props.projects.length == 0) return <h3>if you&apos;re seeing this it means some screenshots are missing</h3>
  return <div className="grid">
    {props.projects.map((p, i) => <ProjectCard {...p} key={i} />)}
  </div>
}

