const {Hero, Image} = require('../models');


module.exports.createHeroImage = async(req, res, next) =>{
    try{
        const {params:{id}, file:{filename}, heroInstance} = req;

        const newImage = await Image.create({ 
            imagePath: filename
        });
        heroInstance.addImage(newImage);
        res.status(200).send(newImage);
    }catch(error) {
        next(error);
    }
}


//удалить картинку 
module.exports.deleteImage = async(req, res, next) =>{
    try{
        const {params:{imageId}} = req;
        const imageInstance = await Image.findByPk(imageId);
        console.log(imageInstance)
        const result = await imageInstance.destroy();
        return res.status(200).send(`Succesfully deleted image ${imageId}`);
    }catch(error) {
        next(error);
    }
}


module.exports.getAllImages = async(req, res, next) =>{
    try{
        const result = await Image.findAll();
        return res.status(200).send(result);

    } catch(error) {
        next(error);
    }
}
