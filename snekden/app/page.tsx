import "../styles/globals.css";
import ProjectCard from "./(components)/ProjectCard";

const elizaProject: ProjectCardData = {
  title: "",
  subtitle: "",
  technologies: [],
  link: "",
  status: "",
  description: ""
};

const doneProjects: ProjectCardData[] = [elizaProject];
const ongoingProjects: ProjectCardData[] = [];
const futureProjects: ProjectCardData[] = [];

export default function HomePage() {
  return (
    <main className="max-w-4cl mx-auto sm:scroll-smooth">
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <h2>Past projects</h2>
        {newFunction()
        }
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


function newFunction() {
  return doneProjects.length == 0 ?
    <h3>if you&apos;re seeing this it means some screenshots are missing</h3>
    :
    doneProjects.map((p, i) => <ProjectCard key={i} data={p} />);
}

