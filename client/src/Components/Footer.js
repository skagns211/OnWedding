import React from "react";
import styled from "styled-components";

const FooterBody = styled.footer`
  margin: 0;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4eae0;
  border-top: 1px solid lightgray;
`;

const Styledicon = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  & li {
    padding: 0px 10px;
  }
`;

const Footer = () => {
  return (
    <FooterBody>
      <li>2021 Onwedding, Inc</li>
      <li>개인정보 처리방침</li>
      <li>이용약관</li>
      <li>사이트맵</li>
      <li>회사 세부정보</li>
      <Styledicon>
        <li>
          <i className="fab fa-google"></i>
        </li>
        <li>
          <i className="fab fa-youtube"></i>
        </li>
        <li>
          <i className="fab fa-facebook-square"></i>
        </li>
      </Styledicon>
    </FooterBody>
  );
};

export default Footer;
