import InputSection from "./component/InputSection";
import GameButtons from "./component/GameButtons";
import CustomPopup from "./component/CustomPopUp";
import { connect } from "react-redux";
import * as Actions from "./state/actions";
import "./App.css";

function App(props) {
  /**
   * noOfGameButtons is useful here because this will actually confirm whether
   * user has made all the button blue. We cannot use listOfDisbledButtons for
   * checking the same as there could be time where all the buttons are enabled
   * but user has not made all of them blue
   */
  const { gameRunning, noOfGameButtons, toggleGameState } = props;
  return (
    <div className="App">
      <h1>Welcome to The Button Game</h1>
      {/**
        Instructions of the game
       */}
      <div className="instructions">
        <p>
          Buttons will become <strong>red</strong> at random intervals (max.
          interval 10 seconds)
        </p>
        <p>
          To win the game, change all buttons to <strong>blue</strong>
        </p>
      </div>
      <p>
        <strong>Enter the number of button(s)</strong>
      </p>

      {/**
        Main body of the game
       */}
      <div className="top-container">
        {/**
         Section to take input from user
       */}
        <InputSection />
        {!gameRunning ? (
          <p>Enter a positive number in the box and click START</p>
        ) : (
          <p>To end the game, click STOP</p>
        )}
      </div>

      {/**
        Grid of buttons
       */}
      <GameButtons />

      {/**
        pop up on game end
       */}
      {gameRunning && noOfGameButtons === 0 ? (
        <CustomPopup
          message="You have won the game!!!"
          onBackdropClick={toggleGameState}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    gameRunning: state.gameRunning,
    noOfGameButtons: state.noOfGameButtons
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
)(App);
