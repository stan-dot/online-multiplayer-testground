import Link from "next/link";
import { ReactElement } from "react";
import { ProjectCardData, ProjectStatus } from "../types/ProjectData";


function StatusEmoji(props: { stats: ProjectStatus }): ReactElement {
  if (props.stats == 'WIP') return <i className="fa-solid fa-user">WIP</i>;
  if (props.stats == 'maintenance') return <i className="fa-solid fa-user">maintenance</i>;
  if (props.stats == 'actively expanding') return <i className="fa-solid fa-user">Intense development</i>;
  if (props.stats == 'MVP') return <i className="fa-solid fa-user">MVP is ready</i>;
  if (props.stats == 'sketch') return <i className="fa-solid fa-user">Sketch</i>;
  if (props.stats == 'idea') return <i className="fa-solid fa-user">Rough idea</i>;
  return <p> unknown </p>
}

// export default function ProjectCard(props: { data: ProjectCardData }) {
export default function ProjectCard({ title, subtitle, technologies, link, status, description }: ProjectCardData) {

  return <div className="w-80 h-80 p-4 bg-green-400 opacity-70 hover:opacity-100 color-white border-solid border-green-800 border-8  rounded" >
    <div className="justify-between flex flex-row mb-4">
      <Link href={link}>
        <h2 id="title" className="italic underline">{title}</h2>
      </Link>
      <StatusEmoji stats={status} />
    </div>
    <h4 className="md-hidden">{subtitle}</h4>
    <p id="technologies" className="border-t-4 border-b-4">
      {technologies.reduce((a, b) => a + `${b} `, "")}
    </p>
    <p className="mt-4">{description}</p>

  </div>
}