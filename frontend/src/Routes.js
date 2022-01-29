import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>
            {/* <Route exact path="/companies">
                <Companies />
            </Route>
            <Route exact path="/companies/:handle">
                <CompanyDetails />
            </Route>
            <Route exact path="/jobs">
                <Jobs />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route>
                <NotFound404 />
            </Route> */}
        </Switch>
    )
}

export default Routes;