import React from "react";
import {
  SettingsContainer,
  StatusContainer,
  BoardContainer,
} from "../containers";
import { Wrapper, Title } from "../AppStyle";

const GamePage = () => {
  return (
    <Wrapper>
      <Title>Minesweeper</Title>
      <SettingsContainer />
      <StatusContainer />
      <BoardContainer />
    </Wrapper>
  );
};

export default GamePage;
