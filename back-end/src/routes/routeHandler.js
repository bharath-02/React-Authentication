import {
    UserController
} from '../controllers/userController';

const Routes = (app) => {
    // test route
    app.route('/api/test')
        .get((req, res) => {
            res.send('GET received')
        })

    // Signup route
    app.route('/api/signup')
        .post(UserController)
}

export default Routes;