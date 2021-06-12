import * as Types from "../types";

/**
 * Initial state of the game
 *
 * gameRunning: state of the game
 * noOfGameButtons: how many buttons are there in the game
 * listOfButtons: state of each button in the game
 * listOfDisbledButtons: this array will hold the indexes of the buttons which
 * are currently in the disabled state before becoming enabled
 */
export const initialState = {
  gameRunning: false,
  noOfGameButtons: 0,
  listOfButtons: [],
  listOfDisbledButtons: []
};

function appReducer(state = initialState, action) {
  /**
   * create new variables by destructuring the objects and arrays
   */
  let newState = { ...state };
  let listOfButtons = [...newState.listOfButtons];
  let listOfDisbledButtons = [...newState.listOfDisbledButtons];
  switch (action.type) {
    /**
     * If the game is not running, then create number of buttons based
     * on the user's input. Fill all the buttons with initial DISABLED_UNCLICKED
     * state. This state will change during the game
     *
     * Also keep an array of indexes of all disabled buttons. This array will
     * help to enable buttons randomly
     *
     * If the game is running and we get this action, then reset to the initial state
     *
     * action.payload here will have number of buttons to start the game
     */
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

    /**
     * Enable the button who's index is received in action.payload.
     *
     * Recreate the array by removing the index for which the button is
     * enabled in this run.
     */
    case Types.ENABLE_BUTTON:
      listOfButtons[newState.listOfDisbledButtons[action.payload]] =
        Types.ENABLED_UNCLICKED;
      listOfDisbledButtons.splice(action.payload, 1);
      newState.listOfButtons = listOfButtons;
      newState.listOfDisbledButtons = listOfDisbledButtons;
      return newState;

    /**
     * Disable the button who's index is received in action.payload.
     *
     * Decrease noOfGameButtons by one on every disable by user.
     */
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
