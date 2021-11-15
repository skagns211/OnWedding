import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import LoginModal from "./LoginModal";

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4eae0;
  max-width: 75%;
  margin: 0 auto;
`;

const StyledLink1 = styled.div`
  padding-left: 0rem;

  & a {
    text-decoration: none;
    color: black;
  }
`;

const StyledLink2 = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;

  & a {
    padding: 1rem;
    text-decoration: none;
    color: black;
  }
`;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? <LoginModal openModalHandler={openModalHandler} /> : null}
      <StyledNav>
        <StyledLink1>
          <Link to="/">Onwedding</Link>
        </StyledLink1>
        <StyledLink2>
          <Link to="/change">ChangePassword</Link>
          <a onClick={openModalHandler}>login</a>
          <Link to="/signup">signup</Link>
        </StyledLink2>
      </StyledNav>
    </>
  );
};

export default Nav;
