import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CoordType } from "../../types/Coord";
import { maze } from "../../components/Maze/maze.template";

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
  winner: "playerOne" | "playerTwo" | "";
};

const initialState: PlayersState = {
  playerOne: { positionX: 6, positionY: 2 },
  playerTwo: { positionX: 0, positionY: 0 },
  currentPlayer: "playerOne",

  winner: "",
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    moveLeft: (state) => {
      if (state.winner) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionX = currentPositionX - 1;

      if (checkForExit(state[state.currentPlayer], "left")) {
        state.winner = state.currentPlayer;
        console.log(state.currentPlayer + " has won");
        return;
      }

      if (checkForWall(newPositionX, currentPositionY)) {
        console.log(`${state.currentPlayer} hit the wall`);
        return;
      }

      state[state.currentPlayer].positionX = newPositionX;
    },
    moveRight: (state) => {
      if (state.winner) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionX = currentPositionX + 1;

      if (checkForExit(state[state.currentPlayer], "right")) {
        state.winner = state.currentPlayer;

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
      if (state.winner) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionY = currentPositionY - 1;

      if (checkForExit(state[state.currentPlayer], "up")) {
        state.winner = state.currentPlayer;

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
      if (state.winner) {
        return;
      }
      const currentPositionX = state[state.currentPlayer].positionX;

      const currentPositionY = state[state.currentPlayer].positionY;

      const newPositionY = currentPositionY + 1;

      if (checkForExit(state[state.currentPlayer], "down")) {
        state.winner = state.currentPlayer;

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
      if (state.winner) {
        return;
      }
      if (state.currentPlayer === "playerOne") {
        state.currentPlayer = "playerTwo";
      } else {
        state.currentPlayer = "playerOne";
      }
    },

    setWinner: (
      state,
      action: PayloadAction<"playerOne" | "playerTwo" | "">
    ) => {
      state.winner = action.payload;
    },
  },
});

export const {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  switchPlayer,
  setWinner,
} = playersSlice.actions;
export const playersSelector = (state: RootState) => state.players;
export default playersSlice.reducer;
