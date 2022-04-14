
const express = require('express');
const axios = require('axios').default;
const fs = require('fs');
const path = require ('path');
const OpenalprApi = require('openalpr_api');
const api = new OpenalprApi.DefaultApi()

const API_KEY ='sk_f4c4c7031d8d45dba323a002';
var url = "https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=us&secret_key=" + API_KEY;

let app = express();

function base64_encode(file) {
   return "data:image/png;base64,"+fs.readFileSync(file, 'base64');
}

app.get('/', function (req, res) {
   res.send('Hello World');
})


let base64String = base64_encode(path.join(__dirname,'./test_images/img-2.jpg'));

var imageBytes = base64String; // {String} The image file that you wish to analyze encoded in base64 

var secretKey = API_KEY; // {String} The secret key used to authenticate your account.  You can view your  secret key by visiting  https://cloud.openalpr.com/ 

var country = "us"; // {String} Defines the training data used by OpenALPR.  \"us\" analyzes  North-American style plates.  \"eu\" analyzes European-style plates.  This field is required if using the \"plate\" task  You may use multiple datasets by using commas between the country  codes.  For example, 'au,auwide' would analyze using both the  Australian plate styles.  A full list of supported country codes  can be found here https://github.com/openalpr/openalpr/tree/master/runtime_data/config 

var opts = { 
  'recognizeVehicle': 0, // {Integer} If set to 1, the vehicle will also be recognized in the image This requires an additional credit per request 
  'state': "", // {String} Corresponds to a US state or EU country code used by OpenALPR pattern  recognition.  For example, using \"md\" matches US plates against the  Maryland plate patterns.  Using \"fr\" matches European plates against  the French plate patterns. 
  'returnImage': 0, // {Integer} If set to 1, the image you uploaded will be encoded in base64 and  sent back along with the response 
  'topn': 10, // {Integer} The number of results you would like to be returned for plate  candidates and vehicle classifications 
  'prewarp': "" // {String} Prewarp configuration is used to calibrate the analyses for the  angle of a particular camera.  More information is available here http://doc.openalpr.com/accuracy_improvements.html#calibration 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};

api.recognizeBytes(imageBytes, secretKey, country, opts, callback);


876-881-5151

var server = app.listen(3000, () => {
   var host = server.address().address
   var port = server.address().port
   console.log(`Example app listening at http://${host}:${port}`);
})