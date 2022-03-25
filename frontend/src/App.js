import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import JoblyApi from "./api"; 
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";
import jwt_decode from "jwt-decode";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  async function signup(userData) {
    try {
      let token = await JoblyApi.registerUser(userData);
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
      console.log("userData:", userData);
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
          let { username } = jwt_decode(token);
          // left here for educational purposes:
          // let username = "testuser";
          // put the token on the Api class so it can use it to call the API.

          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          console.debug("currentUser=", currentUser);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
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


  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) {
    return <p>Loading &hellip;</p>;
    }

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
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
