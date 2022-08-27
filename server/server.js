const path = require("path");
var Minio = require("minio");
var BodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// This middleware is used to enable Cross Origin Resource Sharing This sets Headers to allow access to our client application
app.use(cors());
app.use(BodyParser.json({limit: "4mb"}));

var minioClient = new Minio.Client({
    endPoint: '192.168.10.102',
    port: 9000,
    useSSL:false,
    accessKey: "cDm55DYvnPv069oc",
    secretKey: "4SBRkx0DG94hzRGPSILOlnBF84nccyg6"
    
});


// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    console.log('console log file',file)
    cb(null,  file.originalname);
  },
});

// Route To Load Index.html page to browser
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
const upload = multer({ storage: fileStorageEngine });

// // Single File Route Handler
// app.post("/single", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   // console.log(req.file.path);
  
//   res.send("Single FIle upload success and this is path",req.file.path);
// });


app.post("/single", multer({dest: "./images/"}).single("image"), function(request, response) {
  minioClient.fPutObject("test", request.file.originalname, request.file.path, {"Content-Type": "application/octet-stream"}, function(error, etag) {
      if(error) {
          return console.log(error);
      }
      response.send(request.file);
      console.log('req files ----  ',request.file)
  });
});



app.get("/getpath", function(request, response) {
  console.log('getPath ---          ',request, response)
  presignedUrl = minioClient.presignedGetObject('test', request.query.urlvideo, 1000, function(e, presignedUrl) {
    if (e) return console.log(e)
    console.log(presignedUrl)
    response.send({'presignedUrl':presignedUrl})//отправил урл в клиента
    
  })
});


// minioClient.presignedUrl('GET', 'mybucket', '', 1000, {'prefix': 'data', 'max-keys': 1000}, function(err, presignedUrl) {
//   if (err) return console.log(err)
//   console.log(presignedUrl)
// })



// Multiple Files Route Handler
app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple Files Upload Success");
});

app.listen(5000);
