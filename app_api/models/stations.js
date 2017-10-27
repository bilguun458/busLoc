var mongoose = require('mongoose');

var stationSchema = new mongoose.Schema({
    name: String,
   	//coords: [Number]
   
    coords: {
        type: [Number],
  	    index: '2dsphere'
    }
    
});

mongoose.model('Station', stationSchema);
