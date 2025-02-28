/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import produce from "immer";
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { MIN_WIDTH, MIN_HEIGHT, MIN_MINES, GAME, CODES } from "../../constants";
import {
  initBoard,
  expandOpenedCell,
  getNextCellCode,
  getFlagIncDec,
} from "../../lib/minesweeper";

const SHOW_SETTINGS = "control/SHOW_SETTINGS";
const HIDE_SETTINGS = "control/HIDE_SETTINGS";
const SET_GAME = "control/SET_GAME";
const RESTART_GAME = "control/RESTART_GAME";
const UPDATE_ELAPSED_TIME = "control/UPDATE_ELAPSED_TIME";
const OPEN_CELL = "control/OPEN_CELL";
const ROTATE_CELL_STATE = "control/ROTATE_CELL_STATE";
const AUTOPLAY = "control/AUTOPLAY";
const GAME_MODE = "control/GAME_MODE";

export const showSettings = () => ({ type: SHOW_SETTINGS });
export const hideSettings = () => ({ type: HIDE_SETTINGS });
export const gameMode = (param: any) => ({ type: GAME_MODE, param });
export const autoplaySettings = () => ({
  type: AUTOPLAY,
});
export const setGame = (width: number, height: number, mineCount: number) => ({
  type: SET_GAME,
  width,
  height,
  mineCount,
});
export const restartGame = () => ({ type: RESTART_GAME });
export const updateElapsedTime = () => ({ type: UPDATE_ELAPSED_TIME });
export const openCell = (x: number, y: number) => ({ type: OPEN_CELL, x, y });
export const setLocalStorageInfo = (draft: any) => {
  fetch("https://goonextminespeeper.herokuapp.com/statistic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      gameState: draft.gameState,
      ellapsedTime: draft.elapsedTime,
      cells: draft.openedCellCount,
      autoplay: draft.autoplay,
      fieldWidth: draft.width,
      fieldHeight: draft.height,
      minesCount: draft.mineCount,
    }),
  });
};
export const rotateCellState = (x: number, y: number) => ({
  type: ROTATE_CELL_STATE,
  x,
  y,
});

const initialState = {
  enableSettings: false,
  gameState: GAME.READY,
  enableTimer: false,
  elapsedTime: 0,
  boardData: initBoard(MIN_WIDTH, MIN_HEIGHT, MIN_MINES),
  width: MIN_WIDTH,
  height: MIN_HEIGHT,
  mineCount: MIN_MINES,
  flagCount: 0,
  openedCellCount: 0,
  autoplay: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GAME_MODE:
      return produce(state, (draft: any) => {
        draft.gameState = action.param;
        if (action.param === "win") draft.enableTimer = false;
        setLocalStorageInfo(draft);
      });
    case AUTOPLAY:
      return produce(state, (draft: any) => {
        draft.autoplay = !draft.autoplay;
      });
    case SHOW_SETTINGS:
      return produce(state, (draft: any) => {
        draft.enableSettings = true;
      });
    case HIDE_SETTINGS:
      return produce(state, (draft) => {
        draft.enableSettings = false;
      });
    case SET_GAME:
      return produce(state, (draft) => {
        draft.width = action.width;
        draft.height = action.height;
        draft.mineCount = action.mineCount;
      });
    case RESTART_GAME:
      return produce(state, (draft) => {
        draft.gameState = GAME.READY;
        draft.enableTimer = false;
        draft.autoplay = false;
        draft.elapsedTime = 0;
        draft.boardData = initBoard(state.width, state.height, state.mineCount);
        draft.flagCount = 0;
        draft.openedCellCount = 0;
      });
    case UPDATE_ELAPSED_TIME:
      return produce(state, (draft) => {
        draft.elapsedTime++;
      });
    case OPEN_CELL:
      return produce(state, (draft) => {
        const code = state.boardData[action.y][action.x];
        draft.gameState = GAME.RUN;
        if (code) {
          if (!state.enableTimer) {
            draft.enableTimer = true;
          }

          if (code === CODES.MINE && !draft.autoplay) {
            draft.gameState = GAME.LOSE;
            draft.enableTimer = false;
            setLocalStorageInfo(draft);
          } else if (code === CODES.NOTHING) {
            const expandResult = expandOpenedCell(
              draft.boardData,
              action.x,
              action.y
            );
            draft.boardData = expandResult.boardData;
            draft.openedCellCount += expandResult.openedCellCount;

            // Win
            if (
              state.width * state.height - state.mineCount ===
                draft.openedCellCount &&
              !draft.autoplay
            ) {
              draft.gameState = GAME.WIN;
              draft.enableTimer = false;
              setLocalStorageInfo(draft);
            }
          }
        }

        // Start timer if click on cell
      });
    case ROTATE_CELL_STATE:
      return produce(state, (draft) => {
        const code = state.boardData[action.y][action.x];

        if (code !== CODES.OPENED) {
          draft.boardData[action.y][action.x] = getNextCellCode(code);
          draft.flagCount += getFlagIncDec(code);
        }
      });
    default:
      return state;
  }
}
