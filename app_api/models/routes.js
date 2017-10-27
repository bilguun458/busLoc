var mongoose = require('mongoose');
require('./stations');

var busSchema = new mongoose.Schema({
    licenseNumber: String,
    driver: String
});

var routeSchema = new mongoose.Schema({
    from: {Schema.Types.ObjectId, ref:'Station'},
    to: {Schema.Types.ObjectId, ref:'Station'},
    departures: [{
        date: Date,
        bus: busSchema
    }]
});


mongoose.model('Route', routeSchema);
