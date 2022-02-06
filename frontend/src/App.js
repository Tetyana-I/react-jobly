import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import JoblyApi from "./api"; 
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";
// import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  async function signup(userData) {
    try {
      console.log("inside submit funcion");
      let token = await JoblyApi.registerUser(userData);
      console.log("token", token);
      setToken(token);  
      return { success: true };
          
    } catch (e) {
      console.log("signup errors:", e);
      return { success: false, errors: e };
    }
  }

  async function login(userData) {
    try {
      console.log("inside login funcion");
      let token = await JoblyApi.loginUser(userData);
      console.log("token", token);
      setToken(token);  
      return { success: true };
          
    } catch (e) {
      console.log("login errors:", e);
      return { success: false, errors: e };
    }
  }

  async function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);
    async function getCurrentUser() {
      if (token) {
        try {
          // let { username } = jwt.decode(token);
          let username = "testusernew";
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          console.debug("currentUser=", currentUser);
          setCurrentUser(currentUser);
          // setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <NavBar logout={logout} />
        <main>
            <Routes signup={signup} login={login}/>
        </main>        
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
