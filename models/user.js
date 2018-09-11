import mongoose from 'mongoose'
import 'mongoose-type-email'
import GeoSchema from './geolocation'
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, 'E-mail is required'],
        unique: true,
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }

    // geometry: GeoSchema
});
const User = mongoose.model('user', userSchema);
export default User;