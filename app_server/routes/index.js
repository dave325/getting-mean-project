var express = require('express');
var router = express.Router();
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
var ctrlMain = require('../controllers/main.js');
/* GET home page. */
router.get('/', ctrlMain.index);
module.exports = router;
