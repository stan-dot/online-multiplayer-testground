import Image from "next/image";

function ContactForm() {
  return (
    <section className="p-6 my-12 scroll-mt-20 " id="contact">
      <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
        Contact me
      </h2>
      <form
        action=""
        className="max-w-4xl mx-auto text-2xl sm:text-3xl flex flex-col items-left gap-4"
      >
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          minLength={3}
          maxLength={60}
          placeholder="Your Subject"
          // className="w-full text-black text-2xl sm:text-3xl p-3 rounded-xl border border-solid border-slate-900 dark:border-none"
          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        />

        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={10}
          required
          className="w-full text-black text-2xl sm:text-3xl p-3 rounded-xl border border-solid border-slate-900 dark:border-none "
        >
        </textarea>
        <button className="bg-teal-700 hover:bg-teal-600 active:bg-teal-500 text-white p-3 roun9ded-xl border border-solid border-slate-900 dark:border-none">
          Submit
        </button>
      </form>
    </section>
  );
}
function TestimonialsSection() {
  return (
    <section
      className="p-6 my-12 widescreen:section-min-height tallscreen:section-min-height"
      id="testimonials"
    >
      <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
        Testimonials
      </h2>
      <figure className="m-12">
        <blockquote className=" bg-teal-600 dark:bg-black pl-14 pr-8 py-12 rounded-3xl-relative ">
          <p className="text-2xl sm:text-3xl text-left mt-2 text-white dark:text-slate-400 before:font-serif before:absolute before:top-0 before:left-0 before:text-3xl before:text-white before:opacity-25 before:transform before:translate-x-2 before:translate-y-2 before:content-['\201C'] after:font-serif after:absolute after:-bottom-20 after:right-0 after:text-3xl after:text-white after:opacity-25 after:transform after:translate-x-2 after:translate-y-2 after:content-['\201D']">
            Acme has always been there for me. Their Explorer rocket arrived in
            a wooden crate as expected. Life-long customer! A++ shipping
            experience.
          </p>
        </blockquote>
        <figcaption className="italic text-xl sm:text-2xl text-right mt-2 text-slate-500 dark:text-slate-400">
          &#8212;Wile E. Coyote, Genius
        </figcaption>
      </figure>
      <figure className="m-12">
        <blockquote className=" bg-teal-600 dark:bg-black pl-14 pr-8 py-12 rounded-3xl-relative ">
          <p className="text-2xl sm:text-3xl text-left mt-2 text-white dark:text-slate-400 before:font-serif before:absolute before:top-0 before:left-0 before:text-3xl before:text-white before:opacity-25 before:transform before:translate-x-2 before:translate-y-2 before:content-['\201C'] after:font-serif after:absolute after:-bottom-20 after:right-0 after:text-3xl after:text-white after:opacity-25 after:transform after:translate-x-2 after:translate-y-2 after:content-['\201D']">
            The Acme Adventurer Rocketd has thwarted my Illudium Q-36 Explosive
            Space Modulator on several occasions.{" "}
            <span className="italic">
              This makes me very, very angry!
            </span>{" "}
            Nevertheless, K-9 and I have awarded Acme the Martian contract for
            space exploration rockets based on Acme&apos;s quality and sturdy
            designs.
          </p>
        </blockquote>
        <figcaption className="italic text-xl sm:text-2xl text-right mt-2 text-slate-500 dark:text-slate-400">
          &#8212;Marvin the Martian &amp; K-9
        </figcaption>
      </figure>
      <figure className="m-12">
        <blockquote className=" bg-teal-600 dark:bg-black pl-14 pr-8 py-12 rounded-3xl-relative ">
          <p className="text-2xl sm:text-3xl text-left mt-2 text-white dark:text-slate-400 before:font-serif before:absolute before:top-0 before:left-0 before:text-3xl before:text-white before:opacity-25 before:transform before:translate-x-2 before:translate-y-2 before:content-['\201C'] after:font-serif after:absolute after:-bottom-20 after:right-0 after:text-3xl after:text-white after:opacity-25 after:transform after:-translate-x-2 after:-translate-y-2 after:content-['\201D']">
            I knew I not only wanted &#8212;{" "}
            <span className="italic">I needed</span>{" "}
            &#8212; Acme&apos;s Infinity Rocket for my missionin space. Acme
            delivered in one day! Nothing says{" "}
            <q className="italic">
              Take me to your leader
            </q>{" "}
            like Acme&apos;s Infinity Rocket! &#128175;
          </p>
        </blockquote>
        <figcaption className="italic text-xl sm:text-2xl text-right mt-2 text-slate-500 dark:text-slate-400">
          &#8212;Buzz Lightyear
        </figcaption>
      </figure>
    </section>
  );
}
function CardsSection() {
  return (
    <section
      className="p-6 my-12 scroll-mt-20 widescreen:section-min-height tallscreen:section-min-height"
      id="rockets"
    >
      <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
        Our Rockets
      </h2>
      <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
        <li className="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white py-6 px-2 rounded-3xl shadow-xl dark:bg-black">
          <Image
            src={"/astronaut.jpg"}
            className="w-1/2"
            alt="astronaut"
            width={200}
            height={200}
          />
          <h3 className="text-3xl text-center text-slate-900 dark:text-white">
            Explorer
          </h3>
          <p className="hidden sm:blocktext-3xl text-center mt-2 text-slate-500 dark:text-slate-400">
            $
          </p>
          <p className="sm:hidden text-2xl text-center mt-2  text-slate-500 dark:text-slate-400">
            Affordable Exploration
          </p>
        </li>
        <li className="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white py-6 px-2 rounded-3xl shadow-xl dark:bg-black">
          <Image
            src={"/rocketride.jpg"}
            className="w-1/2"
            alt="adventurer"
            width={200}
            height={200}
          />
          <h3 className="text-3xl text-center text-slate-900 dark:text-white">
            Adventurer
          </h3>
          <p className="hidden sm:blocktext-3xl text-center mt-2 text-slate-500 dark:text-slate-400">
            $$
          </p>
          <p className="sm:hidden text-2xl text-center mt-2  text-slate-500 dark:text-slate-400">
            Best Selling Rocket!
          </p>
        </li>
        <li className="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white py-6 px-2 rounded-3xl shadow-xl dark:bg-black">
          <Image
            src={"/rocket-in-space.jpg"}
            className="w-1/2"
            alt="Infinity"
            width={200}
            height={200}
          />
          <h3 className="text-3xl text-center text-slate-900 dark:text-white">
            Infinity
          </h3>
          <p className="hidden sm:blocktext-3xl text-center mt-2 text-slate-500 dark:text-slate-400">
            $$$
          </p>
          <p className="sm:hidden text-2xl text-center mt-2  text-slate-500 dark:text-slate-400">
            Luxury Starship
          </p>
        </li>
      </ul>
    </section>
  );
}
