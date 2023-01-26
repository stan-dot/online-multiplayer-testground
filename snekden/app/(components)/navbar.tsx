import Link from "next/link";
import { HamburgerMenu } from "./menu";

const linkClassName =
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
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Works In Progress
            <ArrowDownSvg />
          </button>
          <div
            id="dropdownHover"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              <li>
                <Link
                  href="/games/phaser-tutorial-game"
                  className={linkClassName}
                >
                  Phaser game
                </Link>
              </li>
              <li>
                <Link
                  href="/games/userform"
                  className={linkClassName}
                >
                  Form
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/achievements"
            className={linkClassName}
          >
            Achievements
          </Link>
          <a
            href="https://www.canva.com/design/DAFRRXadvpw/dB6g9sy_uO3y3SNpmqnkxQ/view?utm_content=DAFRRXadvpw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            className={`${linkClassName} bg-green-600`}
          >
            Resume [PDF]
          </a>
        </div>
      </div>
    </nav>
  );
};

function ArrowDownSvg() {
  return (
    <svg
      className="w-4 h-4 ml-2"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      >
      </path>
    </svg>
  );
}
