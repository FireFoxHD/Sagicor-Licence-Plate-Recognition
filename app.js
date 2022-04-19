
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

const secret_key ='sk_49a41bf53b3e366e4826f51d';
let imgUrl = 'https://number-plate-recognition.s3.amazonaws.com/A-License-Plates-Lead-Image.jpg'
let url = `https://api.openalpr.com/v3/recognize_url?image_url=${imgUrl}&recognize_vehicle=0&country=us&return_image=0&topn=10&secret_key=${secret_key}`;

axios.post(url)
  .then(function (response) {
    console.log(response.data.results[0].plate);
  })
  .catch(function (error) {
    console.log(error);
  });





let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Example app listening at http://${host}:${port}`);
})