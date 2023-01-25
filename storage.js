const multer = require('multer');
const {STATIC_PATH} = require('./config/path.config'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
  })
  
const uploadImage = multer({storage});

module.exports = uploadImage;