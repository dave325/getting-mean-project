/**
 * Reviews Controller
 */

var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var sendJSONResponse = function(res, status, content) {
	res.status(status);
	res.json(content)
}
var doSetAverageRating = function(req, res, location) {
	var i, reviewCount, ratingAverage, ratingTotal;
	if (location.reviews && location.reviews.length > 0) {
		// Store total amount of reviews
		reviewCount = location.reviews.length;
		ratingTotal = 0;
		for (i = 0; i <= reviewCount; i++) {
			// Increase rating total
			ratingTotal = ratingTotal + location.reviews[i].rating;
		}
		// Calculate Average
		ratingAverage = parseFloat(ratingTotal / reviewCount, 10);
		location.rating = ratingAverage;
		location.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log("Average rating updated to", ratingAverage);
			}
		});
	}
};
// Function that adds new ratings in and return average
var updateAverageRating = function(req, res, location) {
	// Locate correct document with given id
	var locationifd = locationid;
	Loc.findById(locationid).select("reviews").exec(function(err, location) {
		if (!err) {
			// Function that updates the rating
			doSetAverageRating(location);
		}
	});
};
// Adds a review to a loation
var doAddReview = function(req, res, location) {
	if (!location) {
		sendJSONResponse(res, 404, {
			"message" : "locationid was not found"
		});
	} else {
		// adds reviews to locations array
		location.reviews.push({
			author : req.body.author,
			rating : req.body.rating,
			reviewText : req.body.reviewText
		});
		location.save(function(err, location) {
			var thisReview;
			if (err) {
				sendJSONesponse(res, 400, err);
			} else {
				// Function to add rating to overall rating
				updateAverageRating(location._id);
				// Retrieve last review added to array and return it as a JSON
				// confirmation response
				thisReview = location.reviews[locations.reviews.length - 1];
				sendJSONResponse(res, 201, thisReview);
			}
		});
	}
};
// Create a new review
module.exports.reviewCreate = function(req, res) {
	var locationid = req.params.locationid;
	if (locationid) {
		Loc.findById(req.params.locationid).select("review").exec(
				function(err, location) {
					if (err) {
						sendJSONResponse(res, 400, err);
					} else {
						doAddReview(req, res, location);
					}
				})
	} else {
		sendJSONRespone(res, 404, {
			"message" : "Not found, locationid required"
		});
	}
};

// Retrieve a specific review
module.exports.reviewReadOne = function(req, res) {
	// Check if reviewid and lociontid exits
	if (req.params && req.params.locationid && req.params.reviewid) {
		// find document with correesponding id
		Loc.findById(req.params.locationid).select('name reviews').exec(
				function(err, location) {
					var response, review;
					if (!location) {
						sendJSONResponse(res, 404, {
							"message" : "locationid not found"
						});
						return;
					} else if (err) {
						sendJSONResponse(res, 400, err);
						return;
					}
					if (location.reviews && location.reviews.length > 0) {
						review = location.reviews.id(req.params.reviewid);
						if (!review) {
							sendJSONResponse(res, 404, {
								"message" : 
										 location.reviews
										+ " reviews: " + req.params.reviewid
							});
						} else {
							response = {
								location : {
									name : location.name,
									id : req.params.locationid
								},
								review : review
							};
							sendJSONResponse(res, 200, response);
						}// Ends else statement
					} else {
						sendJSONResponse(res, 404, {
							"message" : "No reviews found"
						});
					} // Ends else statement for review
				}// Ends if for reviews
		);
	} else {
		sendJSONResponse(res, 404, {
			"message" : "Not found, lcoationid and reviewid are both required"
		});
	}
}

// Update a current review
module.exports.reviewUpdateOne = function(req, res) {
	// Check if locationid and reviews are valid
	if (!req.params.locationid && !req.params.reviews) {
		sendJSONResponse(res, 404, {
			'message' : 'locationid and review id are requires'
		});
		return;
	}
	// find location and return the review
	Loc.findById(locationid).select('reviews').exec(function(err, location) {
		var thisReview;
		// Chcek if location is found
		if (!location) {
			sendJSONResponse(res, 404, {
				'message' : 'locationid not found'
			});
			return;
		} else if (err) {
			sendJSONResponse(res, 400, err)
			return;
		}
		// Check if reviews exist in database
		if (location.reviews && location, reviews.length > 0) {
			thisReview = location.reviews.id(req.params.reviewid);
			if (!thisReview) {
				sendJSONResponse(res, 404, {
					'memssage' : 'reviewid not found'
				});
				return;
			} else {
				// Create a thisReview object
				thisReview.author = req.body.author;
				thisReview.rating = req.body.rating;
				thisReview.reviewText = req.body.reviewText;
				// Save review
				location.save(function(err, location) {
					if (err) {
						sendJSONResponse(res, 404, err);
					} else {
						updateAverageRating(location._id);
						sendJSONResponse(res, 200, thiseReview);
					}
				});
			}
		}
	});
};
// DElete a specific review
module.exports.reviewDeleteOne = function(req, res) {
	// check if locationid and reviewid exist
	if (!req.params.locationid || !req.params.reviewid) {
		sendJSONResponse(req, 404, {
			'message' : 'Not found. locatoinid and reviewid are both required'
		});
		return;
	}
	// Check for id
	Loc.findById(res.params.locationid).select('reviews') // select review
	.exec(function(err, location) {
		// check if location exists
		if (!location) {
			sendJSONResponse(res, 404, {
				'message' : 'locationid not found'
			});
			return;
		} else if (err) {
			sendJSONResponse(res, 400, err);
			return;
		}
		if (location.reviews && location.reviews.length > 0) {
			if (!location.reviews.id(req.params.reviewid)) {
				sendJSONResponse(res, 404, {
					'message' : 'reviewid not found'
				});
				return;
			} else {
				loction.reviews.id(req.params.reviewid).remove();
				location.save(function(err) {
					if (err) {
						sendJSONResponse(res, 400, err);
					} else {
						updateAverageRating(location._id);
						sendJSONResponse(res, 204, null);
					}
				});
			}
		} else {
			sendJSONResponse(res, 404, {
				'message' : 'No review to delete'
			});
		}
	});
};