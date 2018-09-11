import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoutes from './routes/user'

const app = express();

// connect mongodb
mongoose.connect('mongodb://localhost/userCrud', {useNewUrlParser: true});
mongoose.set({useCreateIndex: true});

mongoose.Promise = global.Promise;

// body parser use
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use(bodyParser.json());

// error handling 
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({error: err});
});

//router initialize
app.use('/api/user', userRoutes);


// listen port 
app.listen(process.env.port || 4000, () => console.log('port is listening...'));