/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-plusplus */
import { CODES } from "../constants";

export const initBoard = (width: number, height: number, mineCount: number) => {
  const candidates = Array(width * height)
    .fill(" ")
    .map((v, i) => i);
  const shuffle = [];
  const boardData = [];

  while (candidates.length > width * height - mineCount) {
    const chosen = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1
    )[0];
    shuffle.push(chosen);
  }

  for (let i = 0; i < height; i++) {
    const rowData = Array(width).fill(CODES.NOTHING);
    boardData.push(rowData);
  }

  for (let i = 0; i < shuffle.length; i++) {
    const x = shuffle[i] % width;
    const y = Math.floor(shuffle[i] / width);
    boardData[y][x] = CODES.MINE;
  }

  return boardData;
};

export const getNextCellCode = (code: number) => {
  switch (code) {
    case CODES.NOTHING:
      return CODES.FLAG;
    case CODES.MINE:
      return CODES.MINE_FLAG;
    case CODES.FLAG:
      return CODES.QUESTION;
    case CODES.MINE_FLAG:
      return CODES.MINE_QUESTION;
    case CODES.QUESTION:
      return CODES.NOTHING;
    case CODES.MINE_QUESTION:
      return CODES.MINE;
    default:
      return code;
  }
};

export const getFlagIncDec = (code: number) => {
  switch (code) {
    case CODES.NOTHING:
    case CODES.MINE:
      return 1;
    case CODES.FLAG:
    case CODES.MINE_FLAG:
      return -1;
    default:
      return 0;
  }
};

export const expandOpenedCell = (boardData: any, x: number, y: number) => {
  let openedCellCount = 0;

  const getMineCount = (x: number, y: number) => {
    let aroundCode: any = [];
    let mineCount = 0;

    aroundCode = boardData[y - 1]
      ? aroundCode.concat(
          boardData[y - 1][x - 1],
          boardData[y - 1][x],
          boardData[y - 1][x + 1]
        )
      : aroundCode;
    aroundCode = aroundCode.concat(boardData[y][x - 1], boardData[y][x + 1]);
    aroundCode = boardData[y + 1]
      ? aroundCode.concat(
          boardData[y + 1][x - 1],
          boardData[y + 1][x],
          boardData[y + 1][x + 1]
        )
      : aroundCode;

    mineCount = aroundCode.filter((v: number) =>
      [CODES.MINE, CODES.MINE_FLAG, CODES.MINE_QUESTION].includes(v)
    ).length;

    return mineCount;
  };

  // Using DFS algorithm to expand
  const dfsSearch = (x: number, y: number) => {
    if (boardData[y][x] !== CODES.NOTHING) {
      return;
    }

    boardData[y][x] = getMineCount(x, y);
    openedCellCount++;

    let aroundPoint: any = [];
    aroundPoint = boardData[y - 1]
      ? aroundPoint.concat(
          { x: x - 1, y: y - 1 },
          { x, y: y - 1 },
          { x: x + 1, y: y - 1 }
        )
      : aroundPoint;
    aroundPoint = aroundPoint.concat({ x: x - 1, y }, { x: x + 1, y });
    aroundPoint = boardData[y + 1]
      ? aroundPoint.concat(
          { x: x - 1, y: y + 1 },
          { x, y: y + 1 },
          { x: x + 1, y: y + 1 }
        )
      : aroundPoint;

    if (boardData[y][x] === 0) {
      aroundPoint.forEach((v: any) => {
        dfsSearch(v.x, v.y);
      });
    }
  };

  dfsSearch(x, y);
  return { boardData, openedCellCount };
};
