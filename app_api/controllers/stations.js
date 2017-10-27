var mongoose = require('mongoose');
var Station = mongoose.model('Station');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


/* GET list of stations */

module.exports.stationsList = function(req, res) {
  Station
    .find()
    .exec(function(err, stations){
      if(!stations) {
        sendJSONresponse(res, 404, {
          "message": "no stations found"
        })
      } else {
        sendJSONresponse(res, 200, stations);
      }
    });
};


module.exports.stationsCreate = function (req, res) {
  console.log(req.body);
  Station.create({
    name: req.body.name,
    coords:[parseFloat(req.body.lng), parseFloat(req.body.lat)]
  }, function(err, station) {
    if(err) {
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, station);
    }
  });
};


module.export.stationsUpdateOne = function(req, res) {
  if(!req.params.stationid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, stationid is required"
    });
    return;
  }
  Station
    .findById(req.params.stationid)
    .exec( function(err, station) {
      if(!station) {
        sendJSONresponse(res, 404, {
          "message": "stationid not found"
        });
        return;
      } else if(err) {
        sendJSONresponse(res, 404, err);
        return;
      }
      station.name = req.body.name;
      station.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
      station.save(function(err, station) {
        if(err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, station);
        }
      });
    });
};

/* DELETE /api/stations/:stationid */
module.exports.stationsDeleteOne = function(req, res) {
  var stationid = req.params.stationid;
  if (stationid) {
    Station
      .findByIdAndRemove(stationid)
      .exec(
        function(err, station) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Station id " + stationid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No stationid"
    });
  }
};
