const { Router } = require('express');
const ImageController = require('../controllers/Image.controller');
const { getHeroInstance } = require('../middlewares/hero.mv');
const uploadImage = require('../storage');

const imageRouter = Router();


imageRouter.post('/heroes/:id', uploadImage.single('heroesImg'), getHeroInstance, ImageController.createHeroImage)
imageRouter.delete('/heroes/image/:imageId', ImageController.deleteImage);
imageRouter.get('/images', ImageController.getAllImages);

module.exports = imageRouter;