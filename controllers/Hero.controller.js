const {Hero, Image, Superpower} = require('../models');

module.exports.createHero = async (req, res, next) => {
    try{
        const {body, file, superpower} = req;
        if(file) {
            const createdHero = await Hero.create(body);

            const {dataValues:{id}} = createdHero;
            const {filename} = file;

            const updated = await Image.create({ 
                imagePath: filename,
                heroId: id
            });
            return res.status(201).send(createdHero);  
                                      
        }
        if(superpower) {
            const createdHero = await Hero.create(body);
            const result = createdHero.addSuperpower(superpower);
            return res.status(201).send(createdHero);
        }
        if(superpower && file) {                       
            const createdHero = await Hero.create(body);    

            const {dataValues:{id}} = createdHero;
            const {filename} = file;

            const updated = await Image.create({ 
                imagePath: filename,
                heroId: id
            });
            const result = createdHero.addSuperpower(superpower);
            return res.status(201).send(result);
        }
        else {
            const {body} = req;
            const createdHero = await Hero.create(body);
            return res.status(201).send(createdHero);
        }

    } catch (error) {
        next(error)
    }
}


module.exports.findAll = async (req, res, next) => {
    try{
        const {pagination} = req;
        const result = await Hero.findAll({
            ...pagination
        });
        return res.status(200).send(result);
      
    } catch (error) {
        next(error)
    }
}





module.exports.findOneByPk = async (req, res, next) => {
    try{
        const {heroInstance} = req;
        const hero = await heroInstance;
        return res.status(200).send(hero);
      
    } catch (error) {
        next(error)
    }
}

module.exports.updateHero = async (req, res, next) => { 
    try{
        const {params: {id}, body, file, superpower, heroInstance} = req;
      if(file) {
        const {filename} = file;
        const updatedHero = await Hero.update(body, {
            where: {
                id
            }
        });
        const updatedImage = await Image.update({ 
            imagePath: filename}, {
                where: {
                    heroId: id
                }
            });
    
        return res.status(201).send(`Superhero ${id} was updated`);
      } else {
        const result = await Hero.update(body, {
                            where: {
                                id
                            }
            });
        
       console.log(heroInstance)
       heroInstance.addSuperpower(superpower);
       return res.status(201).send(`Superhero ${id} was updated`);
      }
    } catch (error) {
        next(error)
    }
}


module.exports.deleteHero = async (req, res, next) => {
    try{
        const {params: {id}} = req;
        const result = await Hero.destroy({      
                    where: {                        
                        id                          
                    }
    });
    if(result) {
        return res.status(200).send(`Superhero ${id} was deleted`);
    } else {
        return res.status(404).send(`Superhero ${id} not found`)
    }
      
    } catch (error) {
        next(error)
    }
} 



module.exports.getHeroWithPowers = async(req, res, next) => {   //показать героя по id со всеми его силами
    try {
        const {params:{id}} = req;
        const heroWithPowers = await Hero.findByPk(id, {
            include: [Superpower] 
        })
        res.status(200).send(heroWithPowers);
    } catch(error) {
        next(error);
    }
}