import { Redirect, Route } from 'react-router-dom';

import { User } from './user';

export const PrivateRoute = (props) => {
    const user = User ();

    if (!user) {
        return <Redirect to="/login" />
    }

    return <Route {...props} />
}