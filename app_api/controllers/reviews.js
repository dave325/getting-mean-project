/**
 * Reviews Controller
 */
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var User = mongoose.model('User');
var sendJSONResponse = function(res, status, content) {
	res.status(status);
	res.json(content)
}
// validates user
var getAuthor = function(req,res,callback){
	if(req.payload && req.payload.email){
		User.findOne({email: req.payload.email})
			.exec(function(err,user){
				if(!user){
					sendJSONResponse(res, 404,{
						"message" : "User not found"
					});
					return;
				}else if(err){
					console.log(err);
					sendJSONResponse(res, 404, err);
					return;
				}
				callback(req,res,user.name);
			})
	}else{
		sendJSONResponse(res, 404, {
			"message" : "User not found"
		});
	}
}
// function that sets the average rating 
var doSetAverageRating = function(location) {
	var i, reviewCount, ratingAverage, ratingTotal;
	if (location.reviews && location.reviews.length > 0) {
		// Store total amount of reviews
		reviewCount = location.reviews.length;
		ratingTotal = 0;
		for (i = 0; i < reviewCount; i++) {
			console.log(location.reviews[i].rating);
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
var updateAverageRating = function(location) {
	// Locate correct document with given id
	Loc.findById(location).select("reviews").exec(function(err, location) {
		if (!err) {
			// Function that updates the rating
			doSetAverageRating(location);
		}else{
			return false;
		}
	});
};
// Adds a review to a location
var doAddReview = function(req, res, location, author) {
	if (!location) {
		sendJSONResponse(res, 404, {
			"message" : "locationid was not found"
		});
	} else {
		// adds reviews to locations array
		location.reviews.push({
			author : author,
			rating : req.body.rating,
			reviewText : req.body.reviewText
		});
		location.save(function(err, location) {
			var thisReview;
			if (err) {
				sendJSONResponse(res, 400, err);
			} else {
				// Function to add rating to overall rating
				updateAverageRating(location._id);
				// Retrieve last review added to array and return it as a JSON
				// confirmation response
				thisReview = location.reviews[location.reviews.length - 1];
				sendJSONResponse(res, 201, thisReview);
			}
		});
	}
};
// Create a new review
module.exports.reviewCreate = function(req, res) {
	getAuthor(req,res, function(req,res,userName){
		var locationid = req.params.locationid;
		if (locationid) {
			Loc.findById(locationid).select("reviews").exec(
					function(err, location) {
						if (err) {
							sendJSONResponse(res, 400, err);
						} else {
							doAddReview(req, res, location, userName);
						}
					})
		} else {
			sendJSONRespone(res, 404, {
				"message" : "Not found, locationid required"
			});
		}
	}); // Close getAuthor function
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