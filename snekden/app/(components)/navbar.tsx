import ProjectsRedirect from "./ProjectsRedirect";
import Link from "next/link";
import { HamburgerMenu } from "./menu";
import { gameReferenceObjects } from "./gameReferenceObjects";

export const linkClassName =
  "lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white ";

export const Navbar = () => {
  return (
    <nav className="flex items-center flex-wrap bg-green-400 p-3 ">
      <i className="bx bxs-dashboard"></i>
      <Link href="/" className="inline-flex items-center p-2 mr-4 ">
        <h2>
          <span className="text-xl text-white font-bold uppercase tracking-wide bg-green-800 rounded p-3">
            &#128013; Snekden
          </span>
        </h2>
      </Link>
      <HamburgerMenu />
      <div
        className={` w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-start items-start  flex flex-col lg:h-auto">
          {gameReferenceObjects.filter((o) => o.invisible === undefined).map(
            (o, i) => {
              return (
                <Link
                  key={i}
                  href={`/games/${o.relativeLink}`}
                  className={linkClassName}
                >
                  {o.name}
                </Link>
              );
            },
          )}

          <Link
            href="/achievements"
            className={linkClassName}
          >
            My story
          </Link>
          {/* <a
            href="https://www.canva.com/design/DAFRRXadvpw/dB6g9sy_uO3y3SNpmqnkxQ/view?utm_content=DAFRRXadvpw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            className={`${linkClassName} bg-green-600 mx-2`}
          >
            Canva Resume
          </a>
          <a
            href="../assets/cv.pdf"
            className={`${linkClassName} bg-green-600 mx-2`}
          >
            Resume [PDF]
          </a> */}
        </div>
      </div>
    </nav>
  );
};
