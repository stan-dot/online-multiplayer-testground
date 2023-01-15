import Image from 'next/image';
import "../styles/globals.css";

type ProjectCard = {
  name: string;
  technologies: string[];
  link: string;
  status: string;
}

// done projects
// ongoing projects
// project backlog
// all using the same project card space
// these need to be intersparsed with screenshot areas

// logo, tagline 
// done projects
// testimonials

// ongoing projects
// updates on twitter

// future projects
// blog decsription and link

// oldschool contact footer 


export default function HomePage() {
  return <div>
    <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white ">
      <header className="bg-teal-700 text-white sticky top-0 z-10">
        <section className="max-w-4xl mx-auto p-5 flex justify-between items-center">
          <h1 className="text-3xl font-medium">
            <a href="#hero">
              Snekden
            </a>
          </h1>
          &#9776;
          {/* <button onClick={() => toggleButton()} id="hamburger-button" className={`text-3xl md:hidden ${buttonOpen ?? "toggle-btn"} cursor-pointer relative w-8 h-8`}>
            <div className="bg-white w-8 h-1 rounded absolute top-4 -mt-0.5 transition-all duration-500 before:content-[''] before:bg-white before:w-8 before:h-1 before:rounded before:absolute before:duration-500 before:-translate-y-3 before:-translate-x-4 before:transition-all after:content-[''] after:bg-white after:w-8 after:h-1 after:rounded after:absolute after:translate-y-3 after:-translate-x-4 after:transition-all after:duration-500">
            </div>
          </button> */}
          <nav className="hidden md:block space-x-8 text-xl" aria-label='main'>
            <a href="#testimonials" className="hover:opacity-90">Testimonials</a>
            <a href="#contact" className="hover:opacity-90">Contact</a>
            <a href="#games" className="hover:opacity-90">Contact</a>
          </nav>
        </section>
        {/* <section id="mobile-menu" onClick={() => toggleButton()} className={`absolute top-68 bg-black w-full text-5xl flex-col justify-content-center origin-top animate-open-menu ${buttonOpen ? "flex" : "hidden"}`}>
          <nav className="flex flex-col min-h-screen items-center py-8" aria-label='mobile'>
            <a href="#hero" className='w-full text-center py-6 hover:opacity-90'>Home</a>
            <a href="#rockets" className='w-full text-center py-6 hover:opacity-90'>Our Rockets</a>
            <a href="#testimonials" className='w-full text-center py-6 hover:opacity-90'>Testimonials</a>
            <a href="#contact" className='w-full text-center py-6 hover:opacity-90'>Contact Us</a>
            <a href="#footer" className='w-full text-center py-6 hover:opacity-90'>Legal</a>
          </nav>
        </section> */}
      </header>
      <main className="max-w-4cl mx-auto sm:scroll-smooth">
        <DescriptionSection />
        <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
        <CardsSection />
        <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
        <TestimonialsSection />
        <hr className="mx-auto bg-dark dark:bg-white w-1/2" />
        <ContactForm />
      </main>
      <Footer />
    </div>
  </div>
}

function DescriptionSection() {
  return <section id="hero" className="flex flex-col-reverse justify-center sm:flex-row px-6 items-center gap-8 mb-120 scroll-mt-40 widescreen:section-min-height tallscreen:section-min-height">
    <article className="sm:w-1/2">
      <h2 className="max-2-md text-4xl font-bold text-center sm:text-5sl sm:text-left text-slate-900 dark:text-white">
        We boldy go <span className="text-indigo-700 dark:text-indigo-300">where no rocket </span>  has gone before...
      </h2>
      <p className="max-w-md text-2xl mt-4 text-center sm:text-left text-slate-700 dark:text-slate-400">We&apos;re building rockets for the next century today. From the moon to Mars, Jupiter and beyond..</p>
      <p className="max-w-md text-2xl mt-4 text-center sm:text-left text-slate-700 dark:text-slate-400">Think Acme Rockets</p>
    </article>
    <Image src="/rocket1.jpg" alt="rocket taking off" width={200} height={200} />
  </section>;
}

function Footer() {
  return <footer id="footer" className="bg-teal-700 text-white text-xl">
    <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
      <address>
        <h2>Stanislaw Malinowski</h2>
        twitter link
        github link
        linkedin link
        {/* 555 Astro Way<br />
        Fairfield, New Jersey 12345-5555<br />
        Email: <a href="mailto:inquiries@acmerockets.com">Inquiries@AcmeRockets.com</a><br />
        Phone: <a href="tel:+155555555">(555) 555-5555</a> */}
        <a href='https://github.com/stan-dot/online-multiplayer-testground'>
          <img src={'./images/GitHub-Mark-Light-32px.png'} /> test
        </a>
      </address>
      <nav className="hidden md:flex flex-col gap-2" aria-label='footer'>
        <a href='#rockets' className='hover:opacity-90'>Our rockets</a>
        <a href='#testimonials' className='hover:opacity-90'>Testimonials</a>
        <a href='#contact' className='hover:opacity-90'>Conact us</a>
      </nav>
      <div className="flex flex-col sm:gap-2">
        <p className="text-right">Copyright &copy; <span id='year'>2023</span>by standot</p>
        <p className="text-right">All Rights Reserved</p>
      </div>
    </section>
  </footer>;
}

function ContactForm() {
  return <section className="p-6 my-12 scroll-mt-20 " id="contact">
    <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
      Contact us
    </h2>
    <form action="" className="max-w-4xl mx-auto text-2xl sm:text-3xl flex flex-col items-left gap-4">
      <label htmlFor="subject">Subject:</label>
      <input type="text" id='subject' name='subject' required minLength={3} maxLength={60} placeholder="Your Subject" className="w-full text-black text-2xl sm:text-3xl p-3 rounded-xl border border-solid border-slate-900 dark:border-none" />
      <label htmlFor="message">Message:</label>
      <textarea name="message" id="message" cols={30} rows={10} required
        className="w-full text-black text-2xl sm:text-3xl p-3 rounded-xl border border-solid border-slate-900 dark:border-none "
      >
      </textarea>
      <button className="bg-teal-700 hover:bg-teal-600 active:bg-teal-500 text-white p-3 roun9ded-xl border border-solid border-slate-900 dark:border-none">
        Submit
      </button>
    </form>
  </section>;
}

function TestimonialsSection() {
  return <section className="p-6 my-12 widescreen:section-min-height tallscreen:section-min-height" id="testimonials">
    <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
      Testimonials
    </h2>
    <figure className="m-12">
      <blockquote className=' bg-teal-600.dark:bg-black.pl-14.pr-8.py-12.rounded-3xl-relative '>
        <p className="text-2xl sm:text-3xl text-left mt-2 text-white dark:text-slate-400 before:font-serif before:absolute before:top-0 before:left-0 before:text-3xl before:text-white before:opacity-25 before:transform before:translate-x-2 before:translate-y-2 before:content-['\201C'] after:font-serif after:absolute after:-bottom-20 after:right-0 after:text-3xl after:text-white after:opacity-25 after:transform after:translate-x-2 after:translate-y-2 after:content-['\201D']">
          Acme
          has always been there
          for me. Their Explorer rocket arrived in a wooden crate as expected.
          Life-long customer! A++ shipping experience.
        </p>
      </blockquote>
      <figcaption className="italic text-xl sm:text-2xl text-right mt-2 text-slate-500 dark:text-slate-400">
        &#8212;Wile E. Coyote, Genius
      </figcaption>
    </figure>
    <figure className="m-12">
      <blockquote className=' bg-teal-600.dark:bg-black.pl-14.pr-8.py-12.rounded-3xl-relative '>
        <p className="text-2xl sm:text-3xl text-left mt-2 text-white dark:text-slate-400 before:font-serif before:absolute before:top-0 before:left-0 before:text-3xl before:text-white before:opacity-25 before:transform before:translate-x-2 before:translate-y-2 before:content-['\201C'] after:font-serif after:absolute after:-bottom-20 after:right-0 after:text-3xl after:text-white after:opacity-25 after:transform after:translate-x-2 after:translate-y-2 after:content-['\201D']">
          The Acme Adventurer Rocketd has thwarted my Illudium
          Q-36 Explosive Space Modulator on several
          occasions. <span className='italic'>This makes me
            very, very angry!</span> Nevertheless, K-9
          and I have awarded Acme the Martian contract for space exploration rockets
          based on Acme&apos;s quality and sturdy designs.
        </p>
      </blockquote>
      <figcaption className="italic text-xl sm:text-2xl text-right mt-2 text-slate-500 dark:text-slate-400">
        &#8212;Marvin the Martian &amp; K-9
      </figcaption>
    </figure>
    <figure className="m-12">
      <blockquote className=' bg-teal-600.dark:bg-black.pl-14.pr-8.py-12.rounded-3xl-relative '>
        <p className="text-2xl sm:text-3xl text-left mt-2 text-white dark:text-slate-400 before:font-serif before:absolute before:top-0 before:left-0 before:text-3xl before:text-white before:opacity-25 before:transform before:translate-x-2 before:translate-y-2 before:content-['\201C'] after:font-serif after:absolute after:-bottom-20 after:right-0 after:text-3xl after:text-white after:opacity-25 after:transform after:-translate-x-2 after:-translate-y-2 after:content-['\201D']">
          I knew I not only wanted &#8212; <span
            className='italic'>I needed</span> &#8212; Acme&apos;s Infinity
          Rocket for my missionin space. Acme delivered in one day! Nothing says <q className='italic'>Take
            me
            to your leader</q> like Acme&apos;s Infinity Rocket!
          &#128175;
        </p>
      </blockquote>
      <figcaption className="italic text-xl sm:text-2xl text-right mt-2 text-slate-500 dark:text-slate-400">
        &#8212;Buzz Lightyear
      </figcaption>
    </figure>
  </section>;
}

function CardsSection() {
  return <section className="p-6 my-12 scroll-mt-20 widescreen:section-min-height tallscreen:section-min-height" id="rockets">
    <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
      Our Rockets
    </h2>
    <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
      <li className="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white py-6 px-2 rounded-3xl shadow-xl dark:bg-black">
        <Image src={"/astronaut.jpg"} className="w-1/2" alt="astronaut" width={200} height={200} />
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
        <Image src={"/rocketride.jpg"} className="w-1/2" alt="adventurer" width={200} height={200} />
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
        <Image src={"/rocket-in-space.jpg"} className="w-1/2" alt="Infinity" width={200} height={200} />
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
  </section>;
}

