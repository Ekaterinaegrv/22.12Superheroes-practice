const {Hero} = require('../models');
const {HERO_SCHEMA} = require('../schemas/HERO_SCHEMA')


module.exports.getHeroInstance = async(req, res, next) => {
    try{
        const {params: {id}} = req;
        const hero = await Hero.findByPk(id);
        if(!hero) {
            throw new Error(`Superhero ${id} not found! Hello from middlevare`)
        }
        req.heroInstance = hero;
        next();
    } catch(error) {
        next(error);
    }
}

module.exports.validateHero = async(req, res, next) => {
    try {
        const {body} = req;
        const validated = await HERO_SCHEMA.validate(body);
        if(validated) {
        next();
        }
    } catch(error) {
        next(error)
    }
}
