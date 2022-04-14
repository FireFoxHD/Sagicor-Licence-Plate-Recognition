
const express = require('express');
const axios = require('axios').default;
const fs = require('fs');
const path = require ('path');


let app = express();

function base64_encode(file) {
   return "data:image/png;base64,"+fs.readFileSync(file, 'base64');
}

app.get('/', function (req, res) {
   res.send('Hello World');
})

const API_KEY ='sk_f4c4c7031d8d45dba323a002';
var url = "https://api.openalpr.com/v3/recognize_bytes?recognize_vehicle=1&country=us&secret_key=" + API_KEY;

let base64String = base64_encode(path.join(__dirname,'./test_images/img-1.jpg'));
axios.post(url,base64String)
  .then(function (response) {
    // handle success
    console.log(response.json());
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });





var server = app.listen(3000, () => {
   var host = server.address().address
   var port = server.address().port
   console.log(`Example app listening at http://${host}:${port}`);
})