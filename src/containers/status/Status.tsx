/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHotkeys } from "react-hotkeys-hook";
import { GAME } from "../../constants";
import {
  showSettings,
  restartGame,
  updateElapsedTime,
  autoplaySettings,
  openCell,
  gameMode,
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
  const width = useSelector((rootState: any) => rootState.control.width);
  const height = useSelector((rootState: any) => rootState.control.height);
  const autoplay = useSelector((rootState: any) => rootState.control.autoplay);
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

  useEffect(() => {
    let isAutoplay: any;
    let x = 0;
    let y = 0;
    if (autoplay) {
      isAutoplay = setInterval(() => {
        if (x === width) {
          y++;
          x = 0;
        }
        dispatch(openCell(x, y));
        x++;
        if (y + 1 === height && x === width) {
          dispatch(gameMode("win"));
          dispatch(autoplaySettings());
        }
      }, 150);
    }
    return () => {
      clearInterval(isAutoplay);
    };
  }, [autoplay, dispatch, height, width]);

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

  const onClickAutoplay = useCallback(() => {
    dispatch(restartGame());
    dispatch(autoplaySettings());
  }, [dispatch]);

  const toggleWin = useCallback(() => {
    dispatch(gameMode("win"));
  }, [dispatch]);

  const hotkeys = {
    autoplay: () => onClickAutoplay(),
    restart: () => onClickRestart(),
    settings: () => onClickSettings(),
    autoWin: () => toggleWin(),
  };

  useHotkeys("a", hotkeys.autoplay);
  useHotkeys("r", hotkeys.restart);
  useHotkeys("s", hotkeys.settings);
  useHotkeys("w", hotkeys.autoWin);

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
          onClickAutoplay={onClickAutoplay}
        />
      )}
    </>
  );
};

export default StatusContainer;
