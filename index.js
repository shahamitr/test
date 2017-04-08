var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var pagesRoute = require('./server/modules/pages/route');

var app = express();

app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api",pagesRoute);

app.use(express.static(__dirname));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});