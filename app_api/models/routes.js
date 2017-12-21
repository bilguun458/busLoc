var mongoose = require('mongoose');
require('./stations');

var busSchema = new mongoose.Schema({
    licenseNumber: String,
    driver: String
});

var pointSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lon: Number
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
    from: String,
    to: String,
    departures: [{
        date: Date,
        bus: busSchema
    }],
    points: [pointSchema]
});


mongoose.model('Route', routeSchema);

/*
db.routes.insert({ from: 'Улаанбаатар',    to: 'Улаангом',    departures: [	{date:new ISODate('2017-12-28T15:00'), bus: {licenseNumber: 'ува1234', driver: 'Бат'}},	{date: new ISODate('2017-12-29T15:00'), bus: {licenseNumber: 'ува3232', driver: 'Дорж'}}],    points: [	{name:'Улаанбаатар', lat:47.91901688406377, lon:106.91774368286133},	{name:'Хархорин', lat:47.194379, lon:102.826538},	{name:'Цэцэрлэг', lat:48.7544, lon:98.2617},	{name:'Улаангом', lat:49.98004, lon:92.068863}	]})
*/
