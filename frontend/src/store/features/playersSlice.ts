import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CoordType } from "../../types/Coord";
import { maze } from "../../components/Maze/maze.template";

const checkForWall = (x: number, y: number) =>
  x === -1 ||
  y === -1 ||
  x >= maze[y].length ||
  y >= maze.length ||
  maze[y][x] === "w";

const checkForExit = () => {};

export type PlayersState = {
  playerOne: CoordType;
  playerTwo: CoordType;
  currentPlayer: "playerOne" | "playerTwo";
};

const initialState: PlayersState = {
  playerOne: { positionX: 6, positionY: 2 },
  playerTwo: { positionX: 0, positionY: 0 },
  currentPlayer: "playerOne",
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    moveLeft: (state) => {
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionX = currentPositionX - 1;

      if (checkForWall(newPositionX, currentPositionY)) {
        console.log(`${state.currentPlayer} hit the wall`);
        return;
      }

      state[state.currentPlayer].positionX = newPositionX;
    },

    moveRight: (state) => {
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionX = currentPositionX + 1;

      if (
        maze[state[state.currentPlayer].positionY][
          state[state.currentPlayer].positionX
        ] === "er"
      ) {
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
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionY = currentPositionY - 1;

      if (checkForWall(currentPositionX, newPositionY)) {
        console.log(`${state.currentPlayer} hit the wall`);
        return;
      }

      state[state.currentPlayer].positionY = newPositionY;
    },

    moveDown: (state) => {
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionY = currentPositionY + 1;

      console.log({ currentPositionX, currentPositionY });

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
