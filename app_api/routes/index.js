var express = require('express');
var router = express.Router();
var ctrlStations = require('../controllers/stations');
var ctrlRoutes = require('../controllers/routes')

router.get('/route/stations', ctrlStations.stationsList);
router.post('/route/stations', ctrlStations.stationsCreate);
router.put('/route/stations/:stationid', ctrlStations.stationsUpdateOne);
router.delete('/route/stations/:stationid', ctrlStations.stationsDeleteOne);


router.get('/route/routes', ctrlRoutes.routesList)
router.get('/route/routes/:from/:to', ctrlRoutes.routesListByStations);
router.post('/route/routes', ctrlRoutes.routesCreate);	
router.put('/route/routes/:routeId', ctrlRoutes.routesUpdateOne);
router.delete('/route/routes/:routeId', ctrlRoutes.routesDeleteOne);


module.exports = router;
