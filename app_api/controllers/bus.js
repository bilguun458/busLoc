var mongoose = require('mongoose');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.busGetLoc = function(req, res) {
    sendJSONresponse(res, 200, {
	lat: 47.34789552369882,
	lng: 104.29183959960939
    });
};
