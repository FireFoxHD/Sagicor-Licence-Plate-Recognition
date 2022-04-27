const express = require('express');
const axios = require('axios').default;
const fs = require('fs');
const path = require ('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()
const mongoose = require ('mongoose');

let app = express();

//form input needs the name 'file' to work
//Don't forget the enctype="multipart/form-data" in your form.

app.get('/', upload.single('uploaded_file'), function (req, res) {
  const file = req.file 
  if(file) return res.status(200).send('Success');
  console.log('fieldname', file.fieldname)
  console.log('originalname', file.originalname)
  console.log('mimetype', file.mimetype)
  console.log('size', file.size)
  console.log('destination', file.destination)
  console.log('filename', file.filename)
  console.log('path', file.path)
})

const secret_key = process.env.SECRET_KEY
let imgUrl = 'https://number-plate-recognition.s3.amazonaws.com/A-License-Plates-Lead-Image.jpg'
let url = `https://api.openalpr.com/v3/recognize_url?image_url=${imgUrl}&recognize_vehicle=0&country=us&return_image=0&topn=10&secret_key=${secret_key}`;

async function sendImageOpenalpr(url){
  try{
    const response = await axios.post(url)
    console.log(response.data.results[0].plate);
  }catch(err){
    console.log(error);
  }
}

sendImageOpenalpr(url)


let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Example app listening at http://${host}:${port}`);
})