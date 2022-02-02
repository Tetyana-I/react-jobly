import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import NavBar from "./NavBar";
import { useState } from "react";
import JoblyApi from "./api"; 


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  async function signup(userData) {
    try {
      console.log("inside submit funcion");
      let token = await JoblyApi.registerUser(userData);
      console.log("token", token);
      console.log("user", userData);
      setToken(token);  
          
    } catch (e) {
      console.log("signup errors:", e);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
            <Routes signup={signup}/>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
