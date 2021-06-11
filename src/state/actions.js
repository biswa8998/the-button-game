import * as Types from "../types";

/**
 * This action will start the game
 * @param {} payload
 */
export const toggleGameState = payload => {
  return {
    type: Types.TOGGLE_GAME_RUNNING,
    payload
  };
};

export const enableButton = payload => {
  console.log("enableButton", payload);
  return {
    type: Types.ENABLE_BUTTON,
    payload
  };
};
export const disableButton = payload => {
  return {
    type: Types.DISABLE_BUTTON,
    payload
  };
};
