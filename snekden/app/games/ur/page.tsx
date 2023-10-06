import { Suspense } from "react";
import Background from "./(components)/Background";
import { Description } from "./(components)/Description";
import { MyComponent } from "./(components)/pixitest";
import { NewBoard } from "./NewBoard";

export default function RoyalGameOfUr() {
  return (
    <div id="royalGameOfUrContainer">
      {/* <Description /> */}
      {/* <MyComponent /> */}
      <h2>game</h2>
      {/* <Background /> */}
      <NewBoard />
    </div>
  );
}
