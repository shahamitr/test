/*
	Route file exposes all the routes for particular module.
*/
var express 		= require("express");
var pageModel 		= require("./pagesModel");
var routes 			= express.Router();

routes.get("/pages/:url", function(req, res) {
    pageModel.analyzePageInfo(req, function(response){
        res.json(response);
    });
});

module.exports = routes;