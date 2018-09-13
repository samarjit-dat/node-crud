import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import mongoDbErrors from 'mongoose-mongodb-errors'
import expressAsyncErrors from 'express-async-errors'
import userRoutes from './routes/user'

const app = express();

// connect mongodb
import './mongo'

// body parser use
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE');
        return res.status(200).json({})
    }
    next();
})

//router initialize
app.use('/api/user', userRoutes);

// 404 Not Found
app.use((req, res, next) => {
    req.status = 404;
    const err = new Error('Page not found');
    next(err);
})

// production mode
if (app.get("env") === "production") {
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(req.status || 500).json({
            message: err.message
        });
    });
}

// error handling 
app.use((err, req, res, next) => {
    console.log(err);
    res.status(req.status || 500).json({
        message: err.message,
        stack: err.stack
    });
});
// listen port 
app.listen(process.env.port || 4000, () => console.log('port is listening...'));