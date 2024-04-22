const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => { 
        const extensaoImg = ['image/png', 'image/jpeg', 'image/jpg'].find(formatoAceito => formatoAceito === file.mimetype);
        if (extensaoImg) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}))