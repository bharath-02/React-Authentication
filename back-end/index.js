import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './src/routes/routeHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

// mongoose connection
const connStr = `mongodb+srv://user-admin:Password01@cluster0.97zvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
        console.log('Error occured while connecting to Database', err)
    } else {
        console.log('Database connected successfully')
    }
});

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// cors setup
app.use(cors())

// Routings 
routes(app)

app.get("/", (req, res) => {
    res.send(`Node & Express server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});