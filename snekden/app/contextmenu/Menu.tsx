import React from "react";
import { MenuContextContainer } from "./styles";
const Menu = ({ title, key }) => {
  return (
    <>
      <MenuContextContainer key={key}>{title}</MenuContextContainer>
    </>
  );
};
export default Menu;