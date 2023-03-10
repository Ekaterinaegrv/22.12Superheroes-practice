const {Superpower, Hero} = require('../models');


module.exports.createPower = async (req, res, next) => {
    try{
        const {body, body:{superpower}, params:{id}} = req;
        const power = await Superpower.create(body);
        return res.status(200).send(`Superpower '${superpower}' was created`)
    } catch (error) {
        next(error)
    }
}

module.exports.addPowerForHero= async (req, res, next) => {
    try{
        const {params:{id, powerId}} = req;
        const heroInstance = await Hero.findByPk(id);
        const powerInstance = await Superpower.findByPk(powerId);
        const {dataValues:{nickname}} = heroInstance;
        const {dataValues:{superpower}} = powerInstance;
        const result = heroInstance.addSuperpower(powerInstance);
        return res.status(200).send(`Superhero ${nickname} get new superpower '${superpower}'`)

    } catch (error) {
        next(error)
    }
}

module.exports.findOnePower = async (req, res, next) => {
    try{
        const {params:{powerId}} = req; 
        const results = await Superpower.findByPk(powerId);
        if(results) {
            return res.status(200).send(results);
        } else {
            return res.status(404).send(`Superpower not exist`);
        }
    } catch (error) {
        next(error)
    }
}

module.exports.findAllPowers = async (req, res, next) => { 
    const {pagination} = req;

    try {
        const results = await Superpower.findAll({
            ...pagination
        });
        return res.status(200).send(results);
    } catch(error) {
        next(error);
    }
}

module.exports.updatePower = async (req, res, next) => {
    try{
        const {body, params:{powerId}} = req;
        const power = await Superpower.findByPk(powerId);
        const updatedPower = await power.update(body, {
            where: {
                powerId
            }
        })
        return res.status(200).send(updatedPower);
    } catch (error) {
        next(error)
    }
}

module.exports.deletePower = async (req, res, next) => {  
    try{
        const {body, params:{powerId}} = req;
        const power = await Superpower.findByPk(powerId);
        if(power) {
            const updatedPower = await power.destroy(body, {
                where: {
                    powerId
                }
            })
            return res.status(200).send('Succesfully deleted');
        } else {
            return res.status(404).send('Superpower does not exist');
        }
    } catch (error) {
        next(error)
    }
}