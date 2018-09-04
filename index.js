import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import routes from './routes/app'

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
    // res.sendStatus(401).json(err);
});

//router initialize
app.use('/api', routes);


// listen port 
app.listen(process.env.port || 4000, () => console.log('port is listening...'));