import InputSection from "./component/InputSection";
import GameButtons from "./component/GameButtons";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Button Game</h1>
      <p>
        <strong>Enter the number of button(s)</strong>
      </p>
      <div className="app-container">
        <InputSection />
        <p>Enter a positive number in the box and click start</p>
      </div>

      <GameButtons />
    </div>
  );
}

export default App;
