import React from "react";
import { Header } from "./Header";
import { MemoTable } from "./MemoTable";
import { Footer } from "./Footer";
import styled from "styled-components";

export function App() {
  return (
    <Sdiv className="App">
      <Header />
      <MemoTable Text={"memo"}/>
      <Footer />
    </Sdiv>
  );
}

const Sdiv = styled.div`
  margin: 0px;
  padding: 0px;
  position:flex;
`;
