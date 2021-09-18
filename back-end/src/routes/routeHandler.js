import {
    SignupController,
    LoginController,
    UpdateUsersController
} from '../controllers/userController';

const Routes = (app) => {
    // test route
    app.route ('/api/test')
        .get ((req, res) => {
            res.send ('GET received')
        })

    // Signup route
    app.route ('/api/signup')
        .post (SignupController)

    // Login route
    app.route ('/api/login')
        .post (LoginController)

    // Update Users Info route
    app.route ('/api/users/:userId')
        .put (UpdateUsersController)
};

export default Routes;