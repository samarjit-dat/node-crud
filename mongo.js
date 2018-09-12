import mongoose from 'mongoose'
import mongoDbErrors from 'mongoose-mongodb-errors'


mongoose.connect('mongodb://localhost/userCrud', {useNewUrlParser: true});
mongoose.set({useCreateIndex: true});
mongoose.plugin(mongoDbErrors);
mongoose.Promise = global.Promise;