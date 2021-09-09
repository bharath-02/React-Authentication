import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = (props) => {
    const user = true;

    if (!user) {
        return <Redirect to="/login" />
    }

    return <Route {...props} />
}