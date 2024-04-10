import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CoordType } from "../../types/Coord";
import { maze } from "../../components/Maze/maze.template";
import { addMessage, chatSelector } from "../../store/features/chatSlice";
import { usersSelector } from "../../store/features/usersSlice";
import { useAppSelector } from "../app/hooks";

const checkForWall = (x: number, y: number) =>
  x === -1 ||
  y === -1 ||
  x >= maze.length ||
  y >= maze.length ||
  maze[y][x] === "w";

const checkForExit = (
  position: CoordType,
  direction: "left" | "right" | "up" | "down"
) => {
  const currentCell = maze[position.positionY][position.positionX];

  if (
    (currentCell === "er" && direction === "right") ||
    (currentCell === "el" && direction === "left") ||
    (currentCell === "eu" && direction === "up") ||
    (currentCell === "ed" && direction === "down")
  )
    return true;

  return false;
};

export type PlayersState = {
  playerOne: CoordType;
  playerTwo: CoordType;
  currentPlayer: "playerOne" | "playerTwo";
  gameIsRunning: boolean;
  winner: "playerOne" | "playerTwo" | "";
};

const initialState: PlayersState = {
  playerOne: { positionX: 6, positionY: 2 },
  playerTwo: { positionX: 0, positionY: 0 },
  currentPlayer: "playerOne",
  gameIsRunning: true,
  winner: "",
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    moveLeft: (state) => {
      if (!state.gameIsRunning) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionX = currentPositionX - 1;

      if (checkForExit(state[state.currentPlayer], "left")) {
        console.log(state.currentPlayer + "has won");
        return;
      }

      if (checkForWall(newPositionX, currentPositionY)) {
        console.log(`${state.currentPlayer} hit the wall`);
        return;
      }

      state[state.currentPlayer].positionX = newPositionX;
    },
    moveRight: (state) => {
      if (!state.gameIsRunning) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionX = currentPositionX + 1;

      if (checkForExit(state[state.currentPlayer], "right")) {
        console.log(state.currentPlayer + "has won");
        return;
      }

      if (checkForWall(newPositionX, currentPositionY)) {
        console.log(`${state.currentPlayer} hit the wall`);
        return;
      }

      state[state.currentPlayer].positionX = newPositionX;
    },

    moveUp: (state) => {
      if (!state.gameIsRunning) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionY = currentPositionY - 1;

      if (checkForExit(state[state.currentPlayer], "up")) {
        console.log(state.currentPlayer + "has won");
        return;
      }

      if (checkForWall(currentPositionX, newPositionY)) {
        console.log(`${state.currentPlayer} hit the wall`);
        return;
      }

      state[state.currentPlayer].positionY = newPositionY;
    },

    moveDown: (state) => {
      if (!state.gameIsRunning) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionY = currentPositionY + 1;

      console.log({ currentPositionX, currentPositionY });

      if (checkForExit(state[state.currentPlayer], "down")) {
        console.log(state.currentPlayer + "has won");
        return;
      }

      if (checkForWall(currentPositionX, newPositionY)) {
        console.log(`${state.currentPlayer} hit the wall`);
        return;
      }

      state[state.currentPlayer].positionY = newPositionY;
    },

    switchPlayer: (state) => {
      if (state.currentPlayer === "playerOne") {
        state.currentPlayer = "playerTwo";
      } else {
        state.currentPlayer = "playerOne";
      }
    },
  },
});

export const { moveLeft, moveRight, moveUp, moveDown, switchPlayer } =
  playersSlice.actions;
export const playersSelector = (state: RootState) => state.players;
export default playersSlice.reducer;
