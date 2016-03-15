// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/instagram',
  //databaseURI: 'mongodb://some:1234@ds015289.mlab.com:15289/mytestdatabase',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'i5I6C6KjntYh1F14EWE7MRvL9zOhSNiUBIZEAez4',
  masterKey: process.env.MASTER_KEY || '1IVPtuNWfywuer1F80BQYIM5t9uDoEOgt6qGENEF', //Add your master key here. Keep it secret!
  fileKey: '41040b26-388f-4741-97bb-330bd549a25d',
  clientKey: 'Srf2kfMCIn4b64j5ObjchlHb6Ywt0r9IXMHZu7iV',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337'  // Don't forget to change to https if needed
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
