var mongoose = require('mongoose');

var stationSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number
});

mongoose.model('Station', stationSchema);
