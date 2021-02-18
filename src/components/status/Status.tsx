import React from "react";
import bomb from "../../assets/img/bomb.png";
import {
  Wrapper,
  Mine,
  ButtonWrapper,
  RestartButton,
  SettingsButton,
  Timer,
} from "./StatusStyle";

type StatusType = {
  leftMineCount: number;
  mineCount: number;
  resultEmoji: any;
  enableSettings: boolean;
  elapsedTime: any;
  onClickRestart: any;
  onClickSettings: any;
};

const Status = ({
  leftMineCount,
  mineCount,
  resultEmoji,
  enableSettings,
  elapsedTime,
  onClickRestart,
  onClickSettings,
}: StatusType) => {
  return (
    <Wrapper>
      <Mine>
        <img width="25px" src={bomb} alt="bomb" />{" "}
        <p>
          {leftMineCount} / {mineCount}
        </p>
      </Mine>
      <ButtonWrapper>
        <RestartButton title="Restart" onClick={onClickRestart}>
          {resultEmoji}
        </RestartButton>
        {enableSettings && (
          <SettingsButton title="Settings" onClick={onClickSettings}>
            ⚙️
          </SettingsButton>
        )}
      </ButtonWrapper>
      <Timer>🕙 {elapsedTime}</Timer>
    </Wrapper>
  );
};

export default Status;
