import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <UserInfoPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <SignupPage />
                </Route>
            </Switch>
        </Router>
    );
}