const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.UUID,
        default: () => uuidv7(),
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
    },
    gender_probability: {
        type: Number,
    },
    sample_size: {
        type: Number,
    },
    age: {
        type: Number,
    },
    age_group: {
        type: String,
    },
    country_id: {
        type: String,
    },
    country_probability: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false

})

const User = mongoose.model('User', userSchema);

module.exports = User;