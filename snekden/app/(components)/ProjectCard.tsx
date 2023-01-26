
export default function ProjectCard(props: { data: ProjectCardData }) {
  return (
    <li className="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white py-6 px-2 rounded-3xl shadow-xl dark:bg-black">
      <h3 className="text-3xl text-center text-slate-900 dark:text-white">
        {props.data.link
          ? <a href={props.data.link} className="link">{props.data.title}</a>
          : props.data.title}
      </h3>
      <p className="hidden sm:blocktext-3xl text-center mt-2 text-slate-500 dark:text-slate-400">
        {props.data.subtitle}
      </p>
      <p className="hidden sm:blocktext-2xl text-center mt-2 text-slate-500 dark:text-slate-400">
        {props.data.technologies.reduce((a, b) => a + `, ${b}`, "")}
      </p>
      <p className="sm:hidden text-2xl text-center mt-2  text-slate-500 dark:text-slate-400">
        {props.data.description}
      </p>
    </li>
  );
}