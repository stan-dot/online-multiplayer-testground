"use client";

import Background from "./(components)/Background";
import { MyComponent } from "./pixitest";

export default function RoyalGameOfUr() {
  return (
    <div id="royalGameOfUrContainer">
      <div id="description">
        <p>
          inspired by this
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/WZskjLq040I?si=56I5zSx0_mq1kBCm"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          >
          </iframe>
        </p>
        <p>
          Find the official
          rules<a href="https://en.wikipedia.org/wiki/Royal_Game_of_Ur" />WIkipedia
          page
        </p>
        <p>
          Here a different implementation
          <a href="https://royalur.net/rules/">here</a>
        </p>
      </div>
      <MyComponent />
      <p>game</p>
      <Background />
    </div>
  );
}
