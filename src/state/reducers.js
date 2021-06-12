// import { combineReducers } from "redux";
import * as Types from "../types";

export const initialState = {
  gameRunning: false,
  noOfGameButtons: 0,
  listOfButtons: [],
  listOfDisbledButtons: []
};

function appReducer(state = initialState, action) {
  let newState = { ...state };
  let listOfButtons = [...newState.listOfButtons];
  let listOfDisbledButtons = [...newState.listOfDisbledButtons];
  switch (action.type) {
    case Types.TOGGLE_GAME_RUNNING:
      if (!newState.gameRunning) {
        newState.gameRunning = !newState.gameRunning;
        newState.noOfGameButtons = parseInt(action.payload, 10);
        listOfButtons = Array.from({ length: action.payload }).fill(
          Types.DISABLED_UNCLICKED
        );
        listOfDisbledButtons = Array.from({
          length: action.payload
        }).map((e, i) => i);
      } else {
        newState.gameRunning = !newState.gameRunning;
        newState.noOfGameButtons = 0;
        listOfButtons = [];
        listOfDisbledButtons = [];
      }

      newState.listOfButtons = listOfButtons;
      newState.listOfDisbledButtons = listOfDisbledButtons;
      return newState;

    case Types.ENABLE_BUTTON:
      listOfButtons[newState.listOfDisbledButtons[action.payload]] =
        Types.ENABLED_UNCLICKED;
      listOfDisbledButtons.splice(action.payload, 1);
      newState.listOfButtons = listOfButtons;
      newState.listOfDisbledButtons = listOfDisbledButtons;
      return newState;

    case Types.DISABLE_BUTTON:
      listOfButtons[action.payload] = Types.DISABLED_CLICKED;
      newState.listOfButtons = listOfButtons;
      newState.noOfGameButtons = newState.noOfGameButtons - 1;
      return newState;
    default:
      return newState;
  }
}

export default appReducer;
