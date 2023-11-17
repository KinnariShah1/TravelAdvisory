const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
    {
    username:{
        type: String,
        require: true,
    },
    title:{
        type: String,
        min: 3,
        require: true,
    },
    desc:{
        type: String,
        require: true,
        min: 3,
    },
    rating:{
        type: Number,
        require: true,
        min: 0,
        max: 5,
    },
    lat:{
        type: Number,
        require: true,
    },
    long:{
        type: Number,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
{ timestamps: true }

);

module.exports = mongoose.model("Pin",PinSchema);