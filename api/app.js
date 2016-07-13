var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var aws            = require('aws-sdk');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');

var multer         = require('multer');
var s3             = require('multer-s3');
var morgan         = require('morgan');
var uuid           = require('uuid');
var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

var sass = require('node-sass');




mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8000'
}));

app.use(passport.initialize());


var s3opt = new aws.S3({ /* ... */ })

var upload = multer({

  storage: s3({
    s3: s3opt,
    // the folder within the bucket
    dirname: 'uploads',
    // set this to your bucket name
    bucket: process.env.WDI_S3_BUCKET,
        // your AWS keys
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // the region of your bucket
    region: 'eu-west-1',
    // IMPORTANT: set the mime type to that of the file
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    // IMPORTANT: set the file's filename here
    // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
    // I'm using uuid (https://github.com/defunctzombie/node-uuid)
    filename: function(req, file, next) {
      // Get the file extension from the original filename
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      // create a random unique string and add the file extension
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});



app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// app.use('/api', expressJWT({ secret: secret })
//   .unless({
//     path: [
//       { url: '/api/login', methods: ['POST'] },
//       { url: '/api/register', methods: ['POST'] }
//     ]
//   }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

var routes = require('./config/routes');
app.use("/api", routes);

// This will upload a single file.
app.post('/api/upload/single', upload.single('file'), function(req, res) {
  res.status(200).json({ filename: req.file.key });
});




app.listen(config.port);
