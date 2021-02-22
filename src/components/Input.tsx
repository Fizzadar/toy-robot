import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
//state
import {
  commandInput,
  modifiedCommandInput,
  onBoard,
  boardPosition,
  initError,
  robotFacingDirection,
  consoleReport,
} from "../store/Atom";
//import constants from staysTheSame
import * as STAYSTHESAME from "../staysTheSame/index";

//***COMPONENT***
const Input: React.FC = () => {
  //***STATE***
  //user input string
  const [command, setCommand] = useRecoilState(commandInput);
  //user input string split into an array of strings
  const [modifiedCommand, setModifiedCommand] = useRecoilState(
    modifiedCommandInput
  );
  //is the robot on the board?
  const [robotOnTheBoard, setRobotOnTheBoard] = useRecoilState(onBoard);
  //error handler
  const [initErrors, setInitErrors] = useRecoilState(initError);
  //x and y coords
  const [boardPositions, setBoardPositions] = useRecoilState(boardPosition);
  //which direction is the robot facing?
  const [robotDirection, setRobotDirection] = useRecoilState(
    robotFacingDirection
  );
  //string to store where on the board the robot currently is
  const [reportRobotPosition, setReportRobotPosition] = useRecoilState(
    consoleReport
  );
  //true/false gate to control allow left/right commands to change robot direction
  let [newCommand, setNewCommand] = useState(true);

  //***FORM FUNCTIONS***
  //Takes user input commands and sets them to 'command' state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value.toUpperCase());
  };

  // React.MouseEvent<HTMLButtonElement> - I know I need to use this but can't make it work - How do I do it correctly?
  //Handles the onClick mouse event - Splits the users input 'command string' into an array of strings. Sets that new array to 'modified command' state
  const onSubmit = (e: any) => {
    e.preventDefault();
    //declare a function to split the users input command into an array of strings
    let splitStringCommand = (input: string) => {
      let initialString: any = input.split(",");
      let arrayOfStrings: any = initialString.map((s: string) => s.trim());
      setModifiedCommand(arrayOfStrings);
    };
    //invoke the splitStringCommand function with the users input string (set as 'command' state in the handleChange function above)
    splitStringCommand(command);
    setNewCommand(true);
    e.target.reset();
    console.log(command);
    setCommand("");
  };

  //***ROBOT CONTROL LOGIC***

  //useEffect - sets user input to state and handles robot control logic:
  useEffect(() => {
    //take user input command array and assign index values to new variables
    const initInput: string = modifiedCommand[0];
    const xAxisValue: string = modifiedCommand[1];
    const yAxisValue: string = modifiedCommand[2];
    const directionFacing: string = modifiedCommand[3];

    const xValue = parseInt(xAxisValue);
    const yValue = parseInt(yAxisValue);

    //Is the first command PLACE?
    if (initInput === "PLACE") {
      setRobotOnTheBoard(true);
    }

    if (robotOnTheBoard && newCommand) {
      //Switch statement that checks commands - logic to control errors and robots within each case:
      switch (initInput) {
        //place the robot on the board
        case "PLACE":
          if (
            xValue >= 0 &&
            xValue <= 4 &&
            yValue >= 0 &&
            yValue <= 4
          ) {
            setBoardPositions({
              x: xValue,
              y: yValue,
            });
            setInitErrors(STAYSTHESAME.ERRORS.nextCommand);
            if (STAYSTHESAME.FACING_DIRECTIONS.includes(directionFacing)) {
              setRobotDirection(directionFacing);
              setInitErrors(STAYSTHESAME.ERRORS.nextCommand);
            } else {
              setInitErrors(STAYSTHESAME.ERRORS.wrongDirection);
            }
          } else {
            setInitErrors(STAYSTHESAME.ERRORS.wrongCoordinate);
          }
          break;
        //turn left
        case "LEFT":
          switch (robotDirection) {
            case "NORTH":
              setRobotDirection("WEST");
              break;
            case "EAST":
              setRobotDirection("NORTH");
              break;
            case "SOUTH":
              setRobotDirection("EAST");
              break;
            case "WEST":
              setRobotDirection("SOUTH");
              break;
          }
          setNewCommand(false);
          setInitErrors(STAYSTHESAME.ERRORS.nextCommand);
          break;
        //turn right
        case "RIGHT":
          switch (robotDirection) {
            case "NORTH":
              setRobotDirection("EAST");
              break;
            case "EAST":
              setRobotDirection("SOUTH");
              break;
            case "SOUTH":
              setRobotDirection("WEST");
              break;
            case "WEST":
              setRobotDirection("NORTH");
              break;
          }
          setNewCommand(false);
          setInitErrors(STAYSTHESAME.ERRORS.nextCommand);

          break;
        //move Robot around the table logic
        case "MOVE":
          //check which direction robot is facing then (depending on the direction) move the robot 1 square or throw an error
          switch (robotDirection) {
            case "NORTH":
              if (boardPositions.y < STAYSTHESAME.TABLE_DIMENSION.y - 1) {
                setBoardPositions({
                  x: boardPositions.x,
                  y: boardPositions.y + 1,
                });
              } else {
                setInitErrors(STAYSTHESAME.ERRORS.wrongWay);
              }
              break;
            case "EAST":
              if (boardPositions.x < STAYSTHESAME.TABLE_DIMENSION.x - 1) {
                setBoardPositions({
                  x: boardPositions.x + 1,
                  y: boardPositions.y,
                });
              } else {
                setInitErrors(STAYSTHESAME.ERRORS.wrongWay);
              }
              break;
            case "SOUTH":
              if (boardPositions.y > 0) {
                setBoardPositions({
                  x: boardPositions.x,
                  y: boardPositions.y - 1,
                });
              } else {
                setInitErrors(STAYSTHESAME.ERRORS.wrongWay);
              }
              break;
            case "WEST":
              if (boardPositions.x > 0) {
                setBoardPositions({
                  x: boardPositions.x - 1,
                  y: boardPositions.y,
                });
              } else {
                setInitErrors(STAYSTHESAME.ERRORS.wrongWay);
              }
              break;
          }
          break;
        //report where robot is
        case "REPORT":
          setReportRobotPosition(
            `Robot at: X: ${boardPositions.x}, Y: ${boardPositions.y}. Facing: ${robotDirection}`
          );
          console.log(
            `Robot at: X: ${boardPositions.x}, Y: ${boardPositions.y}. Facing: ${robotDirection}`
          );
          break;
        default:
          setInitErrors(
            "Enter PLACE,X,Y,F to start. This will put the robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST, "
          );
      }
    }
  }, [
    modifiedCommand,
    setInitErrors,
    robotOnTheBoard,
    setRobotOnTheBoard,
    setBoardPositions,
    setRobotDirection,
    robotDirection,
    reportRobotPosition,
  ]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={handleChange}
          className="inputBox"
          name="robotCommands"
          type="text"
          placeholder="Take the robot for a spin!"
        />
        <button className="goButton">Go</button>
      </form>
    </div>
  );
};

export default Input;
