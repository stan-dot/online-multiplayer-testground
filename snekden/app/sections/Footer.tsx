export function Footer() {
  return (
    <footer id="footer" className="bg-green-400 text-white  fixed bottom-0 w-full">
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <address>
          {/* <h2>Stanislaw Malinowski</h2> */}
          Follow me on{" "}
          <a href="https://twitter.com/standot3" className="link">twitter</a>,
          see my work on{" "}
          <a href="https://github.com/stan-dot" className="link">github</a>. And
          just in case, I have a{" "}
          <a
            href=" https://www.linkedin.com/in/stanislaw-malinowski/?locale=en_US "
            className="link"
          >
            LinkedIn
          </a>{" "}
          profile.
          I also share my experiences with coding stuff on my blog, <a href="https://stan-dot.github.io/elegantly-shipped/" className="link"> <span className="italic underline">elegantly shipped</span></a>
        </address>
        <div className="flex flex-col sm:gap-2">
          <p className="text-right">
            Copyright &copy; <span id="year">2023</span> by standot
          </p>
          <p className="text-right">All Rights Reserved</p>
        </div>
      </section>
    </footer>
  );
}
