/**
 * 
 */

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

// Data that is passed to the home page
var renderHomePage = function(req,res, responseBody){
	var message;
	if(!(responseBody instanceof Array)){
		message = "API lookup error";
		responseBody = [];
	}else{
		if (!responseBody.length){
			message = "No places found nearby";
		}
	}
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
         `,
		locations :responseBody,
		message : message 
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
