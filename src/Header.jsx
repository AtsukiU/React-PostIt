import React from "react";
import styled from "styled-components";
import {MdLogin} from "react-icons/md";


export const Header = () => {
  return (
    <>
    <HeaderContainer>
      <SHeader>Memo</SHeader>
      {/* <LoginButton>
      <MdLogin size="30"/> */}
      {/* </LoginButton> */}
    </HeaderContainer>
    </>
  );
};

const SHeader = styled.div`
  width:100%;
  color: teal;
  font-size: 30px;
`
const HeaderContainer = styled.div`
  display:flex;
  justify-content:space-between;
  margin:4px;
`

const LoginButton = styled.div`
     padding:auto;
     color:teal;
     &:hover{
       color:white;
     }
`