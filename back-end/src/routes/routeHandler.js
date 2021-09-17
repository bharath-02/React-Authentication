import {
    SignupController,
    LoginController
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
};

export default Routes;