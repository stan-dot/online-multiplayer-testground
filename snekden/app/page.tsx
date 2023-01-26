import "../styles/globals.css";

type ProjectCardData = {
  title: string;
  subtitle: string;
  technologies: string[];
  link: string;
  status: string;
  description: string;
};

function ProjectCard(props: { data: ProjectCardData }) {
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

// todo tbh maybe write that as JSON?
// this is similar to contentfully
const elizaProject: ProjectCardData = {
  title: "",
  subtitle: "",
  technologies: [],
  link: "",
  status: "",
  description: ""
};

const projects: ProjectCardData[] = [elizaProject];

export default function HomePage() {
  return (
    <main className="max-w-4cl mx-auto sm:scroll-smooth">
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <h2>Past projects</h2>
        <h3>if you&apos;re seeing this it means some screenshots are missing</h3>
        <h3>Testimonials</h3>
      </section>
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <h2>Ongoing projects</h2>
      </section>
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <h2>Future projects</h2>
        <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
          { }
        </ul>
      </section>
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between resize">
        <h2>The kind of work I&apos;m after</h2>
      </section>
      {/* <CardsSection /> */}
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      {/* <TestimonialsSection /> */}
      <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
      {/* <ContactForm /> */}
    </main>
  );
}


