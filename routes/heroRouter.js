const { Router } = require('express');
const multer = require('multer');

const HeroController = require('../controllers/Hero.controller');
const ImageController = require('../controllers/Image.controller');
const { getHeroInstance, validateHero } = require('../middlewares/hero.mv');
const pagination = require('../middlewares/pagination.mv');
const {STATIC_PATH} = require('../config/path.config'); 

const heroRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
  })
  
const upload = multer({storage});


//heroRouter.post('/', validateHero, HeroController.createHero);
heroRouter.post('/', upload.single('heroesImg'), validateHero, HeroController.createHero);
heroRouter.get('/', pagination, HeroController.findAll);
heroRouter.get('/:id', getHeroInstance, HeroController.findOneByPk);
heroRouter.put('/:id', upload.single('heroesImg'), HeroController.updateHero);
heroRouter.delete('/:id', HeroController.deleteHero);

//Image
//heroRouter.post('/:id/image', getHeroInstance, upload.single('heroesImg'), ImageController.createHeroImage);
//heroRouter.delete('/image/:imageId', ImageController.deleteImageFromHero);


module.exports = heroRouter;