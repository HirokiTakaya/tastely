const Dishes = require('../models/Dishes');

const getDishes = (req, res) => {
    const id = req.params.id;

    if (typeof (id) == 'undefined') {
        Dishes.find({}).exec()
            .then(results => {
                res.status(200).json(results);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        Dishes.findOne({ "_id": id }).exec()
            .then(results => {
                if (results == null) {
                    res.status(404).json(results);
                } else {
                    res.status(200).json(results);
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }
};

const saveDishes = (req, res) => {

    let dishesObj = new Dishes(req.body);

    dishesObj.save()
        .then(result => {

            const resObj = {
                url: '/api/v1/dishes/' + result._id,
                data: result
            };

            res.set('content-location', resObj.url);
            res.status(201).json(resObj);

        })
        .catch(error => {
            res.status(500).json(error);
        });

};

const deleteDish = (req, res) => {
    const id = req.params.id;
        Dishes.deleteOne({ "_id": id }).exec()
        .then(results => {
            if (results.deletedCount === 1) {
                res.status(200).json(results);
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

module.exports = {
    getDishes,
    saveDishes,
    deleteDish
}
