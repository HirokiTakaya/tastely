const { response } = require("express");
const KitchenPlan = require('../models/KitchenPlan');


const getKitchenPlan = (req, res) => {
    
};

const saveKitchenPlan = (req, res) => {
    
    let kitchenPlanObj = new KitchenPlan(req.body);

    kitchenPlanObj.save()
    .then(result=>{
    
        const resObj = {
            url: '/api/v1/kitchenPlan/' + result._id,
            data: result
        };
    
        res.set('content-location', resObj.url);
        res.status(201).json(resObj);
    
    })
    .catch(error=>{
        res.status(500).json(error);
    });

};

module.exports = {
    getKitchenPlan,
    saveKitchenPlan
}
