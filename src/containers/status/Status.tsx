/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GAME } from "../../constants";
import {
  showSettings,
  restartGame,
  updateElapsedTime,
} from "../../store/modules/control";
import { Status } from "../../components";

const StatusContainer = () => {
  const dispatch = useDispatch();
  const enableSettings = useSelector(
    (rootState: any) => rootState.control.enableSettings
  );
  const gameState = useSelector(
    (rootState: any) => rootState.control.gameState
  );
  const enableTimer = useSelector(
    (rootState: any) => rootState.control.enableTimer
  );
  const elapsedTime = useSelector(
    (rootState: any) => rootState.control.elapsedTime
  );
  const mineCount = useSelector(
    (rootState: any) => rootState.control.mineCount
  );
  const flagCount = useSelector(
    (rootState: any) => rootState.control.flagCount
  );

  useEffect(() => {
    let gameTimer: any;

    if (enableTimer) {
      gameTimer = setInterval(() => {
        dispatch(updateElapsedTime());
      }, 1000);
    }

    return () => {
      clearInterval(gameTimer);
    };
  }, [enableTimer, dispatch]);

  const getResultEmoji = useCallback((gameState) => {
    switch (gameState) {
      case GAME.WIN:
        return "😎";
      case GAME.LOSE:
        return "😢";
      default:
        return "😄";
    }
  }, []);

  const onClickRestart = useCallback(() => {
    dispatch(restartGame());
  }, [dispatch]);

  const onClickSettings = useCallback(() => {
    dispatch(showSettings());
  }, [dispatch]);

  return (
    <>
      {!enableSettings && (
        <Status
          leftMineCount={mineCount - flagCount}
          mineCount={mineCount}
          resultEmoji={getResultEmoji(gameState)}
          enableSettings={gameState !== GAME.RUN}
          elapsedTime={elapsedTime.toString().padStart(3, "0")}
          onClickRestart={onClickRestart}
          onClickSettings={onClickSettings}
        />
      )}
    </>
  );
};

export default StatusContainer;
