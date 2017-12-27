var mongoose = require('mongoose');
require('./stations');

var busSchema = new mongoose.Schema({
    licenseNumber: String,
    driver: String
});

var pointSchema = new mongoose.Schema({
    name: String,
    lat: {
	type: Number,
	required: true
    },
    lon: {
	type: Number,
	required: true
    }
});

var routeSchema = new mongoose.Schema({
    /*
    from: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Station',
    }, 
    to: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Station',
    },
    */
    from: {
	type: String,
	required: true
    },
    to: {
	type: String,
	required: true
    },
    departures: [{
        date: Date,
        bus: busSchema
    }],
    points: [pointSchema]
});


mongoose.model('Route', routeSchema);

/*
db.routes.insert({ 
from: 'Улаанбаатар',    
to: 'Улаангом',    
departures: [{
	date: new ISODate('2017-12-28T15:00'),
	bus: {licenseNumber: 'ува1234', driver: 'Бат'}
	},	{
	date: new ISODate('2017-12-29T15:00'),
	bus: {licenseNumber: 'ува3232', driver: 'Дорж'}
}],  
points: [{name:'Улаанбаатар', lat:47.91901688406377, lon:106.91774368286133},
	{name:'Хархорин', lat:47.194379, lon:102.826538},
	{name:'Цэцэрлэг', lat:48.7544, lon:98.2617},	
	{name:'Улаангом', lat:49.98004, lon:92.068863}	]})


db.routes.insert({ 
from: 'Улаангом',    
to: 'Улаанбаатар',    
departures: [{
	date: new ISODate('2017-12-27T15:00'),
	bus: {licenseNumber: 'ува1568', driver: 'Батаа'}
	},	{
	date: new ISODate('2017-12-28T15:00'),
	bus: {licenseNumber: 'увх3326', driver: 'Тамир'}
}],  
points: [{name:'Улаангом', lat:49.98004, lon:92.068863}	,
	{name:'Цэцэрлэг', lat:48.7544, lon:98.2617},	
	{name:'Хархорин', lat:47.194379, lon:102.826538},
	{name:'Улаанбаатар', lat:47.91901688406377, lon:106.91774368286133},
	]})

*/
