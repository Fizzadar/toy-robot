//Recoil state
import { atom } from "recoil";

//"Tell the robot what to do" state
const initCommandState: string = "";

export const commandInput = atom({
  key: "commandInput",
  default: initCommandState,
});

//Take the user input command and turn it into an array of strings

export const modifiedCommandInput = atom({
  key: "modifiedCommandInput",
  default: [],
});

//Is the robot on the board?

export const onBoard = atom({
  key: "onBoard",
  default: false,
});

//Board position state

export const boardPosition = atom({
  key: "boardPosition",
  default: {
    x: 0,
    y: 0,
  },
});

//Robot direction state

const initRobotFacingState: string = "";

export const robotFacingDirection = atom({
  key: "robotFacingDirection",
  default: initRobotFacingState,
});

//Report state for robots current location

const initConsoleReportState: string = "";

export const consoleReport = atom({
  key: "consoleReport",
  default: initConsoleReportState,
});

//State to hold the id (string) value for which box the robot is currently in

const initIdValueState: any = null;

export const idValue = atom({
  key: "idValue",
  default: initIdValueState,
});

//initError
export const initError = atom({
  key: "initError",
  default:
    "Enter PLACE,X,Y,F to start. This will put the robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST, ",
});
