/**
 *	Locations Controller
 */
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

// Create function to calculate geo distance
var theEarth = (function(){
	var earthRadius = 6371; //Radius of the earth in kilometers
	
	// Convert radians to distance
	var getDistanceFromRads = function(rads){
		return parseFloat(rads * earthRadius);
	};
	
	// Convert distance to radians 
	var getRadsFromDistance = function(distance){
		return parseFloat(distance/earthRadius);
	}
	
	// Expose functions
	return {
		getDistanceFromRads : getDistanceFromRads,
		getRadsFromDistance : getRadsFromDistance
	};
})();

var locationsList = function(req, res, results, stats){
	// Create variable to store results
	var locations = [];
	// Cycle through results array
	results.forEach(function(doc){
		locations.push({
			distance: theEarth.getDistanceFromRads(doc.dis),
			name: doc.obj.name,
			addess: doc.obj.address,
			rating: doc.obj.rating,
			facilities: doc.obj.facilities,
			_id: doc.obj._id
		});
	});
	// Return the array of results
	return locations;
};
// Used to send json response to server
var sendJSONResponse = function(res,status,content){
	res.status(status);
	res.json(content)
}
// Creates a list of cafe by distance 
module.exports.listByDistance = function(req,res){ 
	// Retrieve the longitude from the query string
	var lng = parseFloat(req.query.lng);
	// Retrieve the latitude from the query string
	var lat = parseFloat(req.query.lat);
	// Retrieve the distance from the query string
	var distance = parseFloat(req.query.distance);
	// Set the points in geoNear function
	var point = {
			type: "Point",
			coordinates:[lng,lat]
	};
	// Set the geoOptions in geoNear function
	var geoOptions ={
			spherical: true,
			maxDistance: theEarth.getRadsFromDistance(distance),
			num: 10
	};
	// Check if all fields have a value 
	if(!lng || !lat || !distance){
		sendJSONResponse(res, 404, {
			"message" : "lng and lat query parameters are required"
		});
		return;
	}
	//Invoke the geoNear function
	Loc.geoNear(point,geoOptions,function(err, results, stats){
		// Create a variable to hold the results
		var locations = [];
		// Check if an error was reported
		if(err){
			sendJSONResponse(res, 404, err);
		}else{
		 // Retrieve the locations and store it in a variable
		 locations = locationsList(req,res,results,stats);
		 // return the information 
		 sendJSONResponse(res, 200, locations)
		}
	});
}

// Create a new cafe
module.exports.locationsCreate = function(req,res){
	Loc.create({
		name: req.body.name,
		address: req.body.address,
		facilities:req.body.facilities.split(","),
		coords:[parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: [
			{
			days:req.body.days1,
			opening:req.body.opening1,
			closing:req.body.closing1,
			closed:req.body.closed1
			},
			{
				days:req.body.days2,
				opening:req.body.opening2,
				closing:req.body.closing2,
				closed:req.body.closed2
			}
		]
	}, function(err,locations){
		if(err){
			sendJSONResponse(res, 400, err);
		}else{
			sendJSONResponse(res, 201, locations);
		}
	});
	};	


// Retrieve a specific location
module.exports.locationsReadOne = function(req,res){
	if(req.params && req.params.locationid){
	Loc.findById(req.params.locationid)
	.exec(function(err,location){
		if(!location){
			sendJSONResponse(res, 404, {
				"message" : "locationid:" + req.params.locationid + " was not found"
			});
			return;
		}else if(err){
			sendJSONResponse(res, 400, err);
			return;
		}
		sendJSONResponse(res, 200, location);
	});
	}else{
		sendJSONResponse(res, 404, {
			"message" : "No locationid in request"
		});
	}
}

//Update a specific location
module.exports.locationsUpdateOne = function(req,res){
	if(!req.params.locationid){
		sendJSONRespone(req, 404, {
			"message" : "Not found, locationid is required"
		});
		return;
	}
	// Locate locatoin by id
	Loc.findByd(req.params.locationsid)
		.select('-reviews -rating')
		.exec(function(err,location){
			if (!location){
				sendJSONResponse(req, 404, {
					"message": "locationid not found"
				});
				return;
			}else if(err){
				sendJSONResponse(req, 400, err);
				return;
			}
			// Update the location object 
			location.name = req.body.name;
			location.address = req.body.address;
			location.facilities = req.body.facilities.split(",");
			location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
			location.openingTimes = [
				{
					days:req.body.days1,
					opening:req.body.opening1,
					closing:req.body.closing1,
					closed:req.body.closed1
					},
					{
						days:req.body.days2,
						opening:req.body.opening2,
						closing:req.body.closing2,
						closed:req.body.closed2
					}
				];
			// Save response depending on outcome of save function 
			location.save(function(err,location){
				if (err){
					sendJSONResponse(req, 400, err);
				}else{
					sendJSONResponse(req, 200, location);
				}
			})
		});
	Loc.findById(req.params.locationid)
	.exec(function(err, location){
		location.name = req.body.name;
		location.save(function(err,location){
			if(err){
				sendJSNOResponse(req, 404, err);
			}else{
				sendJSONResponse(req, 200, location);
			}
		});
	});
};

// Delete a cafe
module.exports.locationsDeleteOne = function(req,res){
	// Store location id in var
	var locationid = req.body.locationid;
	// check if location id exists 
	if (locationid){
		/*Loc.findById(locationid){
			.exec(function(err, location){
				Loc.remove(function(err,location){
					//confirm success or failure
					// Can be used if you need to do something prior to deleting document
				})
			})
		}*/
		// Quick way to delete id
		Loc.findByIdAndRemove(locationid)
		.exec(function(err,location){
			if (err){
				sendJSONResponse(req, 400, err);
				return;
			}
			// send a good response to json
			senddJSONResponse(req, 204, null);
		});
	}else{
		sendJSONResponse(req, 404,{
			'message': 'No locationid'
		});
	}
};