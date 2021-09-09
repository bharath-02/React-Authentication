const Routes = (app) => {
    app.route('/app/test')
        .get((req, res) => {
            res.send('GET received')
        })
}

export default Routes;