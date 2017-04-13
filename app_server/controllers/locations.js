/**
 * Define the locations controllers 
 */
var request = require("request");
var apiOptions = {
		server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production'){
	apiOptions.server = "https://quiet-savannah-95070.herokuapp.com/";
}

// Create a functino to tranform data
var _formatDistance = function(distance){
	var numDistance, unit;
	if(distance > 1){
		// If supplied distance is over 1km, round one decimal place and add km
		numDistance = parseFloat(distance).toFixed(1);
		unit = 'km';
	}else{
		// Convert to meters and round to nearest meter before adding m unit 
		numDistance = parseInt(distance * 1000, 10);
		unit = 'm';
	}
	return numDistance + unit;
};

// Retrieve Location info
var getLocationInfo = function(req,res,callback){
	var requestOptions, path;
	path = apiOptions.server + '/api/locations/' + req.params.locationid;
	requestOptions = {
			url: path,
			method: "GET",
			json : {}
	};
	request (requestOptions, function(err, response, body){
		var data = body;
		if(response.statusCode === 200){
			data.coords = {
					lng : body.coords[0],
					lat : body.coords[1]
			};
			callback(req,res,data);
		}else{
			_showError(req, res, response.statusCode);
		}
	});
}
// Data that is passed to the home page
var renderHomePage = function(req,res){
	/*
	 * add responseBody to parameters if you take out the comments
	var message;
	if(!(responseBody instanceof Array)){
		message = "API lookup error";
		responseBody = [];
	}else{
		if (!responseBody.length){
			message = "No places found nearby";
		}
	}*/
	res.render('locations-list',{
		// Include information here
		title : 'Loc8r - find a place to work with wifi',
		pageHeader : {
			title : 'Loc8r',
			strapline : 'Find places to work with wifi near you!'
		},
		sidebar : `
		Looking for wifi and a seat? Loc8r helps you find places to work when out and about.
         Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looking for.
         `//,
		/*locations :responseBody,*/
		/*message : message */
	});
};

// Data that is passed to the detail page
var renderDetailsPage = function(req, res, locDetail){
	res.render('location-info',{
		title : locDetail.name,
		pageHeader:{title: locDetail.name},
		location : locDetail,
		sidebar: {
	            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
	            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
	        }
	});
};

// Render for the add review page
var renderReviewForm = function(req,res, locDetail){
	res.render('locations-review-form', {
		title : 'Review' + locDetail.name + ' on Loc8r',
		pageHeader : {title: 'Review ' + locDetail.name},
		error : req.query.err,
		url: req.originalUrl
	});
};

// Show error function
var _showError= function(req,res, status){
	var title, content;
	if(status === 404){
		title = "404, page not found";
		content = "Oh dear. Looks like we can't find this page. Sorry.";
	}else{
		title = status + " something's gone wrong.";
		content = "Something, somewhere, has gone just a little wrong";
	}
	res.status(status);
	res.render('generic-text', {
		title : title,
		content : content
	});
};
// Module for the homepage 
module.exports.homeList = function(req, res) {
	/*// Call render function 
	var requestOptions, path;
	path = apiOptions.server +'/api/locations';
	requestOptions = {
			url : path,
			method :'GET',
			json : {},
			qs : {
				lng : 1,
                lat :1,
				distance : 200
			}
	};
	request (requestOptions, function(err,response,body){
		var  i, data;
		data = body; // Assign new body data to a variable 
		// Run a check for the error code 
		if (response.statusCode === 200 && data.length){
		// Loop through array and format distance value of location
		for(i=0;i < data.length; i++){
			data[i].distance = _formatDistance(data[i].distance);
		}
		}*/
		// Send data to be rendered 
		renderHomePage(req,res);
/*});*/
};

// Retrieve location info to send to details page
module.exports.locationInfo = function(req, res) {
	getLocationInfo(req,res, function(req,res, responseData){
		renderDetailsPage(req,res,responseData);
	});
};

// Create module to add Review 
module.exports.addReview = function(req, res) {
	getLocationInfo(req,res, function(req,res, responseData){
		renderReviewForm(req,res,responseData);
	});
}
module.exports.doAddReview = function(req,res){
	// create containers for variables
	var requestOptions, path, location, postData;
	// store location id from url
	locationid = req.params.locationid;
	// Set path 
	path = apiOptions + '/api/locations' + locationid + '/reviews';
	// Create an object of data 
	postData = {
			author : req.body.name,
			rating : parseInt(req.body.rating,10),
			reviewText : req.body.review
	};
	requestOptions = {
			url: path,
			method: "POST",
			json: postData
	};
	if(!postData.author || !postData.rating || !postData.reviewText){
		res.redirect('/location' + locationid + '/reviews/new$err=val');
	}else{
	request(requestOptions, function(err,repsponse, body){
		// Redirect to page if information was added successfully or show and error page
		if (repsonse.statusCode === 201){
			res.redirect('/location/' + locationid);
		}else if(response.statusCode === 4000 && body.name && body.name === "ValidationError"){
			res.redirect('/location/' + locationid + '/reviews/new?err=val');
		}else{
			console.log(body);
			_showError(req,res,response.statusCode);
		}
	});
	}
};

// Create the angular controller
module.exports.angularApp = function(req,res){
	res.render('layout', {title:'Loc8r'});
};