var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlOthers = require('../controllers/others');
var ctrlMap = require('../controllers/maps')

/* GET home page. */
router.get('/', ctrlMap.byLicense);
router.get('/route', ctrlMap.byRoute);
router.get('/about', ctrlOthers.about);
module.exports = router;
