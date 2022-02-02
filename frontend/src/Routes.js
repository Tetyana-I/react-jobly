import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CompanyDetails from "./CompanyDetails";
import NotFound404 from "./NotFound404";

function Routes({signup}) {
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
                <JobList />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route exact path="/login">
                <LoginForm />
            </Route>
            <Route exact path="/signup">
                <SignupForm signup={signup} />
            </Route>
            <Route>
                <NotFound404 />
            </Route>
        </Switch>
    )
}

export default Routes;