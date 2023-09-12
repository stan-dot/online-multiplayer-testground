import "../styles/globals.css";
import ProjectCard from "./(components)/ProjectCard";
import { projects } from "./(data)/projects";
import { ProjectCardData } from "./types/ProjectData";

const doneProjects: ProjectCardData[] = projects.filter(p => ['MVP', 'actively expanding', 'maintenance'].includes(p.status));
const ongoingProjects: ProjectCardData[] = projects.filter(p => ['WIP'].includes(p.status));
const futureProjects: ProjectCardData[] = projects.filter(p => ['sketch', 'idea'].includes(p.status));

export default function HomePage() {
  return (
    <main className="max-w-4cl mx-auto sm:scroll-smooth">

      <section className="w-fit mx-auto p-4  sm:flex-row sm:justify-between bg-slate-400 my-2">
        <h2 className="mb-4 text-xl">Past projects</h2>
        <CollectionProjects projects={doneProjects} />
      </section>

      <section className="w-fit mx-auto p-4  sm:flex-row sm:justify-between bg-slate-400 my-2">
        <h2 className="mb-4 text-xl">Ongoing projects</h2>
        <CollectionProjects projects={ongoingProjects} />
      </section>

      <section className="w-fit mx-auto p-4  sm:flex-row sm:justify-between bg-slate-400 my-2">
        <h2 className="mb-4 text-xl">Future projects</h2>
        <CollectionProjects projects={futureProjects} />
      </section>

      <div id="goalsSection" className="bg-slate-400 mb-2">
        <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between resize">
          <h2 className="text-xl">The kind of work I&apos;m after</h2>
          <p>I&apos;m looking for work that will let me showcase my full stack skills. </p>
          <p>Knowledge management and personal productivity are especially close to me.</p>
        </section>
        <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
        <section className="max-w-4xl mx-auto p-4  sm:flex-row sm:justify-between resize">
          <h2 className="text-xl">2023 Q1 and Q2 goals</h2>
          <p> <input type="checkbox" disabled checked /> create a React Native app for my BSc research project</p>
          <p> <input type="checkbox" disabled checked /> graduate </p>
        </section>
        <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
        <section className="max-w-4xl mx-auto p-4 sm:flex-row sm:justify-between resize">
          <h2 className="text-xl">5 years time plan</h2>
          <p>to have most of my current projects completed, having transformed at least one of them into something a million people uses.</p>
          <p>I&apos;d be grateful if one of them became my main job, but that might not be in the cards.</p>
          <p>Working on only that that you want to work is a luxury. I plan to attain it.</p>
        </section>
      </div>
    </main>
  );
}

function CollectionProjects(props: { projects: ProjectCardData[] }) {
  if (props.projects.length == 0) return <div>
    <h3>if you&apos;re seeing this it means some screenshots are missing</h3>
  </div>
  return <div className="grid grid-flow-row grid-cols-3  w-fit gap-2">
    {props.projects.map((p, i) => <ProjectCard {...p} key={i} />)}
  </div>
}

