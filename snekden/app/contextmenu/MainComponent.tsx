"use client";
import MenuContext from "./MenuContext";
import { data } from "./data";

function MainComponent() {
  return (
    <div
      className="App"
      onContextMenu={(e) => {
        e.preventDefault(); // prevent the default behaviour when right clicked
        console.log("Right Click");
      }}
    >
      <MenuContext data={data} />
    </div>
  );
}
export default MainComponent;
