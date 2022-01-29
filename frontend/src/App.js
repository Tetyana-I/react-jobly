import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import NavBar from "./NavBar";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
            <Routes />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
