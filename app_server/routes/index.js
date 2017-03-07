var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
/*
 * One way to create a Controller
 * Creates the controller function to call back in the router,get method 
 * var homePageController = function(req,res, next){
 * 		res.render('index', {title:'Express', author: 'David'});
 * }
 */
/*	A better way to create the controller
 * 	Create it in a file and use module.export.{methodName} to save the method to call
 * Better for the MVC approach s
 */
/* Locations Page */
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* About page */
router.get('/about', ctrlOthers.about);

module.exports = router;
