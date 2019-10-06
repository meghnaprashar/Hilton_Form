import React, { StatelessComponent } from "react";
import styled from "./styled-components";
import logo from "./logo.svg";
import RoomRequestForm from "./RoomRequestForm";

const Section = styled("section")`
  width: 80vw;
  min-height: 100vh;
  margin: 20px auto 40px auto;
  text-align: center;
`;

const Header = styled("header")`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: black;
`;

const Logo = styled("img")`
  height: 40vmin;
`;

const FormWrapper = styled("main")`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const App: StatelessComponent = () => (
  <Section>
    <Header role="banner">
      <Logo src={logo} />
      <h1>Hilton Assessment 2</h1>
    </Header>
    <FormWrapper role="main">
      <RoomRequestForm />
    </FormWrapper>
  </Section>
);

export default App;
