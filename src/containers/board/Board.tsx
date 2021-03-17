import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Board } from "../../components";

const BoardContainer = () => {
  const enableSettings = useSelector(
    (rootState: any) => rootState.control.enableSettings
  );
  const gameState = useSelector(
    (rootState: any) => rootState.control.gameState
  );
  const width = useSelector((rootState: any) => rootState.control.width);
  const height = useSelector((rootState: any) => rootState.control.height);

  const onRightClickBoard = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      {!enableSettings && (
        <Board
          width={width}
          height={height}
          gameState={gameState}
          onRightClickBoard={onRightClickBoard}
        />
      )}
    </>
  );
};

export default BoardContainer;
