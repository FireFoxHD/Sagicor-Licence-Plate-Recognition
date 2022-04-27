require('dotenv').config()
const express = require('express');
const axios = require('axios').default;
const fs = require('fs');
const path = require ('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const {uploadFile, getFileStream} = require('./s3Client')

let app = express();

//form input needs the name 'file' to work
//Don't forget the enctype="multipart/form-data" in your form.




async function uploadtest(){
  const file = {
    path : "uploads/img-1.jpg",
    filename : "img-1.jpg"
  }

  let result = await uploadFile(file);
  let url = result.Location
  return url
}


async function sendImageOpenalpr(imgUrl){
  const secret_key = process.env.SECRET_KEY
  let url = `https://api.openalpr.com/v3/recognize_url?image_url=${imgUrl}&recognize_vehicle=0&country=us&return_image=0&topn=10&secret_key=${secret_key}`;
  try{
    const response = await axios.post(url)
    console.log(response.data.results[0].plate);
  }catch(err){
    console.log(err);
  }
}

// let run = async()=>{
//   try{
//     let AWSurl = await uploadtest();
//     sendImageOpenalpr(AWSurl)
//   }catch(err){
//     console.log(err)
//   }
// }

// run();

sendImageOpenalpr('https://number-plate-recognition.s3.amazonaws.com/img-1.jpg')

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

let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Example app listening at http://${host}:${port}`);
})