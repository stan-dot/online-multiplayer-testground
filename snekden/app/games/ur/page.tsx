import { Suspense } from "react";
import Background from "./(components)/Background";
import { Description } from "./(components)/Description";
import { MyComponent } from "./(components)/pixitest";

export default function RoyalGameOfUr() {
  return (
    <div id="royalGameOfUrContainer">
      {/* <Description /> */}
      {/* <MyComponent /> */}
      <p>game</p>
      <Background />
    </div>
  );
}
