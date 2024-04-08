import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CoordType } from "../../types/Coord";

const lengthMaze = 8;

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
      if (state.currentPlayer === "playerOne") {
        if (state.playerOne.positionX - 1 >= 0) {
          state.playerOne.positionX = state.playerOne.positionX - 1;
        }
      } else {
        if (state.playerTwo.positionX - 1 >= 0) {
          state.playerTwo.positionX = state.playerTwo.positionX - 1;
        }
      }
    },

    moveRight: (state) => {
      if (state.currentPlayer === "playerOne") {
        if (state.playerOne.positionX + 1 < lengthMaze) {
          state.playerOne.positionX = state.playerOne.positionX + 1;
        }
      } else {
        if (state.playerTwo.positionX + 1 < lengthMaze) {
          state.playerTwo.positionX = state.playerTwo.positionX + 1;
        }
      }
    },

    moveUp: (state) => {
      if (state.currentPlayer === "playerOne") {
        if (state.playerOne.positionY - 1 >= 0) {
          state.playerOne.positionY = state.playerOne.positionY - 1;
        }
      } else {
        if (state.playerTwo.positionY - 1 >= 0) {
          state.playerTwo.positionY = state.playerTwo.positionY - 1;
        }
      }
    },

    moveDown: (state) => {
      if (state.currentPlayer === "playerOne") {
        if (state.playerOne.positionY + 1 < lengthMaze) {
          state.playerOne.positionY = state.playerOne.positionY + 1;
        }
      } else {
        if (state.playerTwo.positionY + 1 < lengthMaze) {
          state.playerTwo.positionY = state.playerTwo.positionY + 1;
        }
      }
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
