var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const users = require('./routes/api/users');

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// DB Config
const db = require("./config/keys").mongoURI;

// mongoose
//     .connect(db, {useNewUrlParser: true})
//     .then(() => console.log("mongoDb connected"))
//     .catch(err => console.log(err))

// Initialise Index Page
app.get('/', (req, res) => {
    res.send('Welocome to Pixel Love');
});

//Create Mongo Connection
const conn = mongoose.createConnection(db);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init Stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

// Create Storage Engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo); 
            });
        });
    }
});
const upload = multer({ storage });

// @route POST /upload
// @desc Upload files to DB
app.post('/upload', upload.array('file', 12) , (req, res) => {
    res.json({ file: req.files });
}); 

// @route GET /files
// @desc Display all files in JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray(() => {
        // Check if files 
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exists'
            })
        } else {
            // files.map(file => {
            //     // Read output to Browser
            //     const readStream = gfs.createReadStream(file.filename);
            //     readStream.pipe(res);  

            //     // If above not works
            //     res.send({ files: files});
            // })
            res.send({ files: files});
        }
    })
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

//  Routes
app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
