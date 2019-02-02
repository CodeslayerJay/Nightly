// JOURNAL MODEL - COLLECTION
var mongoose = require('mongoose');


var Journal = new mongoose.Schema({
    toughts_entry: {
        type: String,
        min: 1,
        max: 5000,
        default: ''
    },
    good_deeds_entry: {
        type: String,
        min: 1,
        max: 1000,
        default: ''
    },
    adjust_focus_entry: {
        type: String,
        min: 1,
        max: 1000,
        default: ''
    },
    complete_todo: {
        type: String,
        enum: ['true', 'false']
    },
    complete_exercise: {
        type: String,
        enum: ['true', 'false']
    },
    timestamp: {type:Date, default: Date.now},
    entry_date: {type:String, default: Date.now}
});


module.exports = mongoose.model('Journal', Journal);