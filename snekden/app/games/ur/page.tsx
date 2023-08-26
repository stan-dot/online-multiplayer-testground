"use client";

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
    </div>
  );
}

/*
machine elements
- move randomizer - 4 dice, each 50-50 between 0 and 1 move points
- whose turn it is
- ai move choice
- position of all of player's 7 pieces, inlcuding not deployed and finished
- second player's position
- user does the possible interactions - changes to the player positions
only some moves are legal
-  if only 1 move green if 0 then 0

*/
