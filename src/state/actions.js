import * as Types from "../types";

/**
 * This action will toggle the state of the game
 * between running and not running.
 * @param {number of buttons in the game} payload
 */
export const toggleGameState = payload => {
  return {
    type: Types.TOGGLE_GAME_RUNNING,
    payload
  };
};

/**
 * This action will enable a button
 * @param {index of the button} payload
 */
export const enableButton = payload => {
  return {
    type: Types.ENABLE_BUTTON,
    payload
  };
};

/**
 * This action will disable a button
 * @param {index of the button} payload
 */
export const disableButton = payload => {
  return {
    type: Types.DISABLE_BUTTON,
    payload
  };
};
