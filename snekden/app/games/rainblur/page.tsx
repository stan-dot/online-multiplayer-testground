

"use client";
import { useEffect } from "react";

export default function Testgame() {
  // const game = useGame(starConfig);
  return <div className="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed" >
    <p>Some content</p>
    <div className="h-full">
      <div className="w-full container mx-auto">
        <div className="w-full flex items-center justify-between">
          <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
            Rain<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">blur</span>
          </a>

          <div className="flex w-1/2 justify-end content-center">
          </div>
        </div>
      </div>

      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Main
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              Hero Message
            </span>
            to sell yourself!
          </h1>
          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Sub-hero message, not too long and not too short. Make it just right!
          </p>

          <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-blue-300 py-2 font-bold mb-2" htmlFor="emailaddress">
                Signup for our newsletter
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                type="text"
                placeholder="you@somewhere.com"
              />
            </div>
          </form>
        </div>


        <div className="mx-auto md:pt-16">
          <p className="text-blue-400 font-bold pb-8 lg:pb-6 text-center">
            Download our app:
          </p>
          <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
          </div>
        </div>

        <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <a className="text-gray-500 no-underline hover:no-underline" href="#">&copy; App 2020</a>
          - Template by
          <a className="text-gray-500 no-underline hover:no-underline" href="https://www.tailwindtoolbox.com">TailwindToolbox.com</a>
        </div>
      </div>
    </div>
  </div>
}