import { useState } from "react";
import { connect } from "react-redux";
import * as Actions from "../state/actions";

function InputSection(props) {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState(false);

  /**
   * If the game is not running, then run validation on the input
   * If input is valid, toggle game running state to true
   * In case the game is already running, toogle game running to false
   */
  const toggleGameRunning = () => {
    if (props.gameRunning) {
      props.toggleGameState();
      return;
    }

    if (
      value.trim().length === 0 ||
      value.indexOf(".") !== -1 ||
      value < 1 ||
      value > 1001
    ) {
      setInputError(true);
      return;
    }
    props.toggleGameState(value);
  };

  const errorStyle = {
    visibility: inputError ? "visible" : "hidden"
  };

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Number of buttons"
          min="0"
          max="1000"
          value={value}
          className="input-box"
          onChange={e => {
            setValue(e.target.value);
          }}
          onClick={() => {
            setInputError(false);
          }}
        />
      </div>
      <p style={errorStyle} className="input-error">
        Only positive natural numbers between 1 and 1000 allowed
      </p>
      <button className="start-stop-button" onClick={toggleGameRunning}>
        {!props.gameRunning ? "Start" : "Stop"}
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  const { gameRunning } = state;
  return {
    gameRunning
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleGameState: data => dispatch(Actions.toggleGameState(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputSection);
