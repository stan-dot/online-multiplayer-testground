import Link from "next/link";
import { HamburgerMenu } from "./menu";

const linkClassName = "lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white "

export const Navbar = () => {
  return (
    <>
      <nav className="flex items-center flex-wrap bg-green-400 p-3 ">
        <i className='bx bxs-dashboard'></i>
        <Link href="/" className="inline-flex items-center p-2 mr-4 ">
          <h2>
            <span className="text-xl text-white font-bold uppercase tracking-wide bg-green-800 rounded p-3">
              &#128013;
              Snekden
            </span>
          </h2>
        </Link>
        <HamburgerMenu />
        <div
          className={` w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-start items-start  flex flex-col lg:h-auto">

            <details className={linkClassName}>
              <summary>
                <h3>Work In Progress</h3>
              </summary>
              <Link
                href="/games/phaser-tutorial-game"
                className={linkClassName}
              >
                Test game
              </Link>
              <Link
                href="/games/raw-canvas"
                className={linkClassName}
              >
                test canvas
              </Link>
            </details>
            <details className={linkClassName}>
              <summary>broken games</summary>
              <Link
                href="/games/docs"
                className={linkClassName}
              >
                text editor
              </Link>
              <Link
                href="/games/face"
                className={linkClassName}
              >
                Face detection example
              </Link>
            </details>
            <Link
              href="/old_stuff"
              className={linkClassName}
            >
              Old app
            </Link>
            {/* <Link
              href="/games/react-konva-playground"
              className={linkClassName}
            >
              Konva example
            </Link> */}
            <Link
              href="/games/minesweeper"
              className={linkClassName}
            >
              Minesweeper
            </Link>
            <Link
              href="/achievements"
              className={linkClassName}
            >
              Achievements
            </Link>
            <Link
              href="/about"
              className={linkClassName}
            >
              About me
            </Link>
            <Link
              href="/contact"
              className={linkClassName}
            >
              Contact me
            </Link>
            <Link
              href="/contact"
              className={linkClassName}
            >
              Resume
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
