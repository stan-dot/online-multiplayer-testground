import { Suspense } from "react";
import Background from "./(components)/Background";
import { GameUI } from "./GameUI";
import { Description } from "./(components)/Description";

export default function RoyalGameOfUr() {
  return (
    <div id="royalGameOfUrContainer">
      <div id="showBar" className="m-2 w-full bg-blue-700 bg-solid rounded-xl">
        <h2 className="text-xl">The Royal Game Of Ur</h2>
      </div>
      <Description />
      <Suspense fallback={<p>Loading game...</p>}>
        {/* <Background /> */}
        <GameUI />
      </Suspense>
    </div>
  );
}
