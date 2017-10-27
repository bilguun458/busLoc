var mongoose = require('mongoose');

var stationSchema = new mongoose.Schema({
    name: String,
    Coords: {
        type: [Number],
        index: '2dsphere'
    }
});


mongoose.model('Station', stationSchema);
