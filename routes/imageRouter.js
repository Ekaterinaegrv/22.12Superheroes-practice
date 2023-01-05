const { Router } = require('express');

const HeroController = require('../controllers/Hero.controller');
const ImageController = require('../controllers/Image.controller');
const { getHeroInstance } = require('../middlewares/hero.mv');
const pagination = require('../middlewares/pagination.mv');

const imageRouter = Router();

imageRouter.delete('/heroes/image/:imageId', ImageController.deleteImage);
imageRouter.delete('/heroes/:id/image/:imageId', getHeroInstance, ImageController.deleteImageFromHero);


module.exports = imageRouter;