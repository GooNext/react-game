/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { CELL_MARGIN, CELL_SIZE } from "../../constants";
import { CellContainer } from "../../containers";
import winGif from "../../assets/gif/iskra.gif";

type BoardType = {
  width: string | number | any;
  height: string | number | any;
  onRightClickBoard: any;
  gameState: string;
};

const divStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "10px auto 0 auto",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Board = ({ width, height, onRightClickBoard, gameState }: BoardType) => {
  return (
    // @ts-ignore
    <div
      style={{
        ...divStyle,
        flexWrap: "wrap",
        width: `${width * (CELL_SIZE + CELL_MARGIN * 2)}px`,
      }}
    >
      {gameState !== "win" ? (
        Array(width * height)
          .fill(" ")
          .map((v, i) => (
            <CellContainer
              key={v + i}
              x={i % width}
              y={Math.floor(i / width)}
            />
          ))
      ) : (
        <img src={winGif} alt="wingif" />
      )}
    </div>
  );
};

export default Board;
