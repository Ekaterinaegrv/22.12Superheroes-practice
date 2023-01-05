const {Hero, Image} = require('../models');

module.exports.createHeroImage = async(req, res, next) =>{
    try{
        const {heroInstance:{dataValues:{id}}, file:{filename}, body} = req;

        const updated = await Image.create({ 
            imagePath: filename,
            heroId: id
        });
        res.status(200).send(updated);
    }catch(error) {
        next(error);
    }
}

module.exports.getAllImages = async(req, res, next) =>{
    try{
        const result = await Image.findAll();
        return res.status(200).send(result);
    }catch(error) {
        next(error);
    }
}

module.exports.getImagesOfHero = async(req, res, next) =>{
    try{
        const {params:{id}} = req;
        //найти все картинки, где heroId
        const result = await Image.findAll({
            where:{
                heroId: id
            }
        });
        return res.status(200).send(result);
    }catch(error) {
        next(error);
    }
}




//удалить картинку 
module.exports.deleteImage = async(req, res, next) =>{
    try{
        const {params:{imageId}} = req;
        const imageInstance = await Image.findByPk(imageId);
        const result = await imageInstance.destroy({
            where: {                        
            id: imageId                    
        }
        }
        );
        return res.status(200).send(result);
    }catch(error) {
        next(error);
    }
}

//отвязать картинку от героя
module.exports.deleteImageFromHero = async(req, res, next) =>{      //вроде работает, но heroId остается
    try{
        const {heroInstance, params:{imageId}} = req;
        const imageInstance = await Image.findByPk(imageId);
       const result = await imageInstance.removeHero(heroInstance);
       return res.status(200).send('Sucsessful');
    }catch(error) {
        next(error);
    }
}
