import { Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import ProfileForm from "./ProfileForm";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import CompanyDetails from "./CompanyDetails";
import NotFound404 from "./NotFound404";
import PrivateRoute from "./PrivateRoutes";

function Routes({signup, login}) {
    return (
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>
            <PrivateRoute exact path="/companies">
                <CompanyList />
            </PrivateRoute>
            <Route exact path="/companies/:handle">
                <CompanyDetails />
            </Route>
            <PrivateRoute exact path="/jobs">
                <JobList />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
                <ProfileForm />
            </PrivateRoute>
            <Route exact path="/login">
                <LoginForm login={login}/>
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