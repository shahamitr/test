/*
	Categories model defines and declared all the methods which we can use to deal with categories schema in mongoDB.
*/
var pageParser = require('meta-extractor');
var request = require("request");
var cheerio = require("cheerio");
var h1_count = 0;
var h2_count = 0;
var h3_count = 0;
var h3_count = 0;
var image_count = 0;
var top_keyword = "";

function analyzePageInfo(req, callback) {
	console.log(req.params.url);
	request("https://"+req.params.url, function (error, response, body) {
	  if (!error) {
		var $ = cheerio.load(body);
		
		var meta_title = $("title").text();
		var meta_title_length = $("title").text().length;
		var h1_count = $("h1").length;
		var h2_count = $("h2").length;
		var h3_count = $("h3").length;
		var image_count = $("img").attr("alt","").length;
		var top_keyword = "";  
		
		/*
		var ttext = $("body").text();
		var corpus = [];
		var words = [];
		
		ttext.split(" ").forEach(function (word) {
		  if (corpus[word]) {
			corpus[word]++;
		  } else {
			corpus[word] = 1;
		  }
		});
		
		for (prop in corpus) {
		  words.push({
			word: prop,
			count: corpus[prop]
		  });
		}
		  
		words.sort(function (a, b) {
		  return b.count - a.count;
		});
		
		console.log(words);
		*/
		
		var jsonResponse = {
			"meta_title":meta_title,
			"meta_title_length":meta_title_length,
			"h1_count":h1_count,
			"h2_count":h2_count,
			"h3_count":h3_count,
			"image_count":image_count,
			"top_keyword":top_keyword
		}
		
		
		
		
		response = {status: "ok", statuscode: 200, data: jsonResponse};
	  } else {
		response = {status: "fail", statuscode: 400, data: {"error":"Error parsing site"}};
	  }
		callback(response);
	});
}

module.exports.analyzePageInfo = analyzePageInfo;
