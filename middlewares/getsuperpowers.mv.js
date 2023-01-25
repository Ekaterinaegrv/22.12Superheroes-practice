const {Superpower} = require('../models');

module.exports.findSuperpower = async(req, res, next) => {
    try {
        const {body: {superpower} }= req;
        if(superpower) {
            console.log(superpower)
          
            for (let i = 0; i < superpower.length; i++) {
                const power = await Superpower.findOne({
                    where: {
                         superpower: superpower[i]
                        }
                  })

                  if(power) {
                    console.log(`Have in db ${power}`)
                    req.superpower = power;
                  } 
                  else {
                    console.log(`Not have that power in db`)
                    const newPower = await Superpower.create({"superpower": `${superpower}`});   
                    console.log(newPower);
                    req.superpower = newPower;              
                  }
              next();
         }

        }
        else{  
            next();
        }
       
    } catch(error) {
        next(error);
    }
}

/*
            //const powers = [];
            // for (let i = 0; i < superpower.length; i++) {
            //     const power = await Superpower.findAll({
            //         where: {
            //              superpower: superpower[i]
            //             }
            //       })
                

            //     powers.push(power['_id']);
            // }

            const power = await Superpower.findAll({
                        where: {
                             superpower: superpower
                            }
                      })
            //req.superpower = powers;
            next();

           // если суперсилы такой нет -
           // await Superpower.create({superpower})







module.exports.findIngredient = async(req, res, next) => {
    try {
        const {body: {ingredients} }= req;
        const ingrs = [];
        for (let i = 0; i < ingredients.length; i++) {
            const ingr = await Ingredient.findOne({
                name: ingredients[i]});
                ///////If does not exist - create it!
                ingrs.push(ingr['_id']);
        }
        req.ingredients = ingrs;
        next();
    } catch(error) {
        next(error);
    }
}
*/