import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { ContextMenu } from "./styles";
import useContextMenu from "./useContextMenu";
const MenuContext = ({ data }) => {
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  return (
    <div>
      {data.map((item, i) => (
        <div
          key={i}
          onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY);
          }}
        >
          <Menu id={item.id} title={item.title} />
        </div>
      ))}
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            <li>Edit</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
  );
};
export default MenuContext;
