/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { memo } from "react";
import { Button } from "./CellStyle";

type PropsType = {
  cellCode: string;
  cellText: string;
  onClickCell: (e: any) => "";
  onRightClickCell: (e: any) => "";
};

const Cell = ({
  cellCode,
  cellText,
  onClickCell,
  onRightClickCell,
}: PropsType) => {
  return (
    <Button
      // @ts-ignore
      cellCode={cellCode}
      onClick={onClickCell}
      onContextMenu={onRightClickCell}
    >
      {cellText}
    </Button>
  );
};

export default memo(Cell);
