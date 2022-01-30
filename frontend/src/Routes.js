import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import Jobs from "./Jobs";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import CompanyDetails from "./CompanyDetails";
import NotFound404 from "./NotFound404";

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/companies">
                <CompanyList />
            </Route>
            <Route exact path="/companies/:handle">
                <CompanyDetails />
            </Route>
            <Route exact path="/jobs">
                <Jobs />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route>
                <NotFound404 />
            </Route>
        </Switch>
    )
}

export default Routes;