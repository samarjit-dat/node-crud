import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const GeoSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"   
    }
})

export default GeoSchema;