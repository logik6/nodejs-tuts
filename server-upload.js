var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({ dest: '/tmp/'}));
var upload = multer({ dest: '/tmp/'}).single();
app.use(upload);

app.get('/uploadform.html', function (req, res) {
   res.sendFile( __dirname + "/" + "uploadform.html" );
});

app.post('/file_upload', function (req, res) {
   console.log(req.file.filename);
   console.log(req.file.path);
   console.log(req.file.type);
   var file = __dirname + "/" + req.file.filename;
   
   fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(req.file, data, function (err) {
         if( err ){
            console.log( err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:req.file.name
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
});

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});