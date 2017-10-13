module.exports.byLicense = function(req, res) {
	res.render('map-draw', { title: 'Автобусны одоогийн байршил'});
};


module.exports.byRoute = function(req, res) {
	res.render('map-route', { title: 'Чиглэлд явж буй автоснууд'});
};
