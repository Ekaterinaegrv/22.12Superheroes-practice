const { Router } = require('express');
const PowerController = require('../controllers/Power.controller');
const { getHeroInstance } = require('../middlewares/hero.mv');
const pagination = require('../middlewares/pagination.mv');

const powerRouter = Router();

powerRouter.post('/', PowerController.createPower);
powerRouter.put('/:id/:powerId', getHeroInstance, PowerController.addPowerForHero);
powerRouter.get('/', pagination, PowerController.findAllPowers);
powerRouter.get('/:powerId', PowerController.findOnePower);
powerRouter.put('/:powerId', PowerController.updatePower);
powerRouter.delete('/:powerId', PowerController.deletePower);


module.exports = powerRouter;