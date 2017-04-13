/**
 *	Database Schema  
 */

var mongoose = require('mongoose');

// To create a subDocument/nested schema, first create the schema seperately before the parent schemas
var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required:true}
});

// Another subDocument
var reviewSchema = new mongoose.Schema({
	author: {type : String, required : true},
	rating: {type: Number, required: true, min: 0, max: 0},
	reviewText:{type : String, required : true},
	createdOn: {type: Date, "default": Date.now()} 
	
});
// Constructor function for defining new schemas 
var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5}, // Set up default value and other things for each path
	facilities: [String],
	coords: {type: [Number], index: '2dsphere'},
	// To call subDocument use the [] brackets
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);