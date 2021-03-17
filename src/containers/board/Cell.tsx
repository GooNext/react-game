import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { GAME, CODES } from "../../constants";
import { openCell, rotateCellState } from "../../store/modules/control";
import { Cell } from "../../components";
import bomb from "../../assets/img/bomb.png";
import cellClick from "../../assets/sounds/cellclick.mp3";

type PropsType = {
  x: string | any;
  y: string | any;
};
const CellContainer = ({ x, y }: PropsType) => {
  const [play] = useSound(cellClick);
  const dispatch = useDispatch();
  const gameState = useSelector(
    (rootState: any) => rootState.control.gameState
  );
  const cellCode = useSelector(
    (rootState: any) => rootState.control.boardData[y][x]
  );

  const getCellText = useCallback(
    (code) => {
      switch (code) {
        case CODES.OPENED:
        case CODES.NOTHING:
          return "";
        case CODES.FLAG:
          return "🚩";
        case CODES.MINE_FLAG:
          switch (gameState) {
            case GAME.WIN:
              return <img width="25px" src={bomb} alt="bomb" />;
            case GAME.LOSE:
              return <img width="25px" src={bomb} alt="bomb" />;
            default:
              return "🚩";
          }
        case CODES.QUESTION:
          return "❔";
        case CODES.MINE_QUESTION:
          switch (gameState) {
            case GAME.WIN:
              return <img width="25px" src={bomb} alt="bomb" />;
            case GAME.LOSE:
              return <img width="25px" src={bomb} alt="bomb" />;
            default:
              return "❔";
          }
        case CODES.MINE:
          switch (gameState) {
            case GAME.WIN:
              return <img width="25px" src={bomb} alt="bomb" />;
            case GAME.LOSE:
              return <img width="25px" src={bomb} alt="bomb" />;
            default:
              return "";
          }
        default:
          return code;
      }
    },
    [gameState]
  );

  const onClickCell: any = useCallback(() => {
    if (gameState === GAME.READY || gameState === GAME.RUN) {
      dispatch(openCell(x, y));
    }
    play();
  }, [gameState, dispatch, x, y, play]);

  const onRightClickCell: any = useCallback(
    (e: any) => {
      e.preventDefault();

      if (gameState === GAME.READY || gameState === GAME.RUN) {
        dispatch(rotateCellState(x, y));
      }
    },
    [gameState, dispatch, x, y]
  );

  return (
    <Cell
      cellCode={cellCode}
      cellText={getCellText(cellCode)}
      onClickCell={onClickCell}
      onRightClickCell={onRightClickCell}
    />
  );
};

export default memo(CellContainer);
