import { connect } from "react-redux";
import { useState, useEffect } from "react";
import * as Actions from "../state/actions";
import { ENABLED_UNCLICKED } from "../types";
import { getRandomNumber } from "../utils";

function GameButtons(props) {
  let timeoutId = null;
  const [gameRunning, setGameRunning] = useState(false);

  /**
   * Create a random timeout between 1 and 60 seconds. call the enable
   * button function after timeout is over. Keep the timeout id in a
   * variable in case user stops the game in the middle or we have no
   * more disabled buttons
   *
   * In enableButton, we will provide a random index based on the length of
   * disabled buttons array.
   */
  const randomlyEnableButtons = () => {
    const randomTimeout = getRandomNumber(5, true);
    timeoutId = setTimeout(() => {
      props.enableButton(
        getRandomNumber(props.listOfDisbledButtons.length - 1)
      );
    }, randomTimeout * 1000);
  };

  useEffect(() => {
    // if game has just started
    if (!gameRunning && props.gameRunning) {
      randomlyEnableButtons();
      setGameRunning(props.gameRunning);
    }
    // if game is stopped
    else if (gameRunning && !props.gameRunning) {
      clearTimeout(timeoutId);
    } else {
      // if disbaled buttons are present
      if (props.listOfDisbledButtons.length !== 0) {
        randomlyEnableButtons();
      } else {
        // if no more disbaled buttons
        clearTimeout(timeoutId);
      }
    }
    // eslint-disable-next-line
  }, [props.gameRunning, props.listOfDisbledButtons.length]);

  return (
    <div className="buttons-container">
      {props.listOfButtons.map((e, i) => {
        return (
          <div className="item" key={i}>
            <button
              className="game-button"
              type={e}
              disabled={ENABLED_UNCLICKED !== e}
              onClick={() => {
                props.disableButton(i);
              }}
            ></button>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  const {
    listOfButtons,
    gameRunning,
    noOfGameButtons,
    listOfDisbledButtons
  } = state;
  return {
    listOfButtons,
    gameRunning,
    noOfGameButtons,
    listOfDisbledButtons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enableButton: data => dispatch(Actions.enableButton(data)),
    disableButton: data => dispatch(Actions.disableButton(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameButtons);
