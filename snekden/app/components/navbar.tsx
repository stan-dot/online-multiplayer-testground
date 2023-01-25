import Link from "next/link";
import { HamburgerMenu } from "./menu";

const linkClassName = "lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white "

export const Navbar = () => {
  return (
    <>
      <nav className="flex items-center flex-wrap bg-green-400 p-3 ">
        <i className='bx bxs-dashboard'></i>
        <Link href="/" className="inline-flex items-center p-2 mr-4 ">
          <svg
            viewBox="0 0 1024 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-white h-8 w-8 mr-2"
          >
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
          <h2>
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Snekden
            </span>
          </h2>
        </Link>
        <HamburgerMenu />
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        {/* ${active ? "" : "hidden"} */}
        <div
          className={` w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-start items-start  flex flex-col lg:h-auto">
            <Link
              href="/games/testgame"
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
            <Link
              href="/src"
              className={linkClassName}
            >
            Old app
            </Link>
            <Link
              href="/games/minesweeper"
              className={linkClassName}
            >
            Minesweeper
            </Link>
            {/* <Link
              href="/achievements"
              className={linkClassName}
            >
              Achievements
            </Link> */}
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
