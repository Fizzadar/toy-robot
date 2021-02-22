import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  boardPosition,
  idValue,
  onBoard,
  robotFacingDirection,
} from "../store/Atom";
import * as STAYSTHESAME from "../staysTheSame/index";


const BoardBlock = ({x, y}: {x: number, y: number}) => {
  const boardPositions = useRecoilValue(boardPosition);
  const robotDirection = useRecoilValue(robotFacingDirection);
  const robotOnTheBoard = useRecoilValue(onBoard);

  const classes = ['block'];

  if (robotOnTheBoard && boardPositions.x === x && boardPositions.y === y) {
    classes.push('robotZombie');

    switch(robotDirection) {
      case 'NORTH':
        classes.push('rotateZombieNorth');
        break
      case 'EAST':
        classes.push('rotateZombieEast');
        break
      case 'SOUTH':
        classes.push('rotateZombieSouth');
        break
      case 'WEST':
        classes.push('rotateZombieWest');
        break
    }
  }

  return (
    <div className={classes.join(' ')}></div>
  );
};


const Board = () => {
  return (
    <div className="container">
      <div className="play-area">
        <div className="row">
          <BoardBlock x={0} y={4} />
          <BoardBlock x={1} y={4} />
          <BoardBlock x={2} y={4} />
          <BoardBlock x={3} y={4} />
          <BoardBlock x={4} y={4} />
        </div>
        <div className="row">
          <BoardBlock x={0} y={3} />
          <BoardBlock x={1} y={3} />
          <BoardBlock x={2} y={3} />
          <BoardBlock x={3} y={3} />
          <BoardBlock x={4} y={3} />
        </div>

        <div className="row">
          <BoardBlock x={0} y={2} />
          <BoardBlock x={1} y={2} />
          <BoardBlock x={2} y={2} />
          <BoardBlock x={3} y={2} />
          <BoardBlock x={4} y={2} />
        </div>
        <div className="row">
          <BoardBlock x={0} y={1} />
          <BoardBlock x={1} y={1} />
          <BoardBlock x={2} y={1} />
          <BoardBlock x={3} y={1} />
          <BoardBlock x={4} y={1} />
        </div>
        <div className="row">
          <BoardBlock x={0} y={0} />
          <BoardBlock x={1} y={0} />
          <BoardBlock x={2} y={0} />
          <BoardBlock x={3} y={0} />
          <BoardBlock x={4} y={0} />
        </div>
        {/* <div id="" className="block"></div> */}
      </div>
    </div>
  );
};

export default Board;
