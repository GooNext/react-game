import React from "react";
import {
  SettingsContainer,
  StatusContainer,
  BoardContainer,
} from "./containers";
import { Wrapper, Title } from "./AppStyle";
import bg from "./assets/img/bg.jpg";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url(${bg})`,
      }}
    >
      <SettingsPanel />
      <Wrapper>
        <Title>Minesweeper</Title>
        <SettingsContainer />
        <StatusContainer />
        <BoardContainer />
      </Wrapper>
    </div>
  );
};

export default App;
