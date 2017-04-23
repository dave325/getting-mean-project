/**
 * 
 */
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');

// Create a middleware for requests 
var auth = jwt({
	secret : process.env.JWT_SECRET,
	userProperty : 'payload'
});
//Locations 
router.get('/locations', ctrlLocations.listByDistance);
router.post('/locations', ctrlLocations.locationsCreate); // Create locations
router.get('/locations/:locationid', ctrlLocations.locationsReadOne); // Get unique result
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);// Add method
router.delete('/locations/:locationid',ctrlLocations.locationsDeleteOne); // Delete method

//Reviews
router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewReadOne);
router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewDeleteOne);
module.exports = router;

//Authenticate Users
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);