var Cars = require('../models/cars')


var operations = {
    brands: function (callback) {
        Cars.aggregate([
            { $group: {_id: '$Brand'}},
            { $sort: {_id: 1}},
            { $project: {_id: 0, Brand: "$_id"}}
        ])
        .exec(function (err, brands) {
            if (err) {
                console.log(err)
                return next(err)
            }

            callback(brands)
        })
    },

    models: function (brand, callback) {
        Cars.aggregate([
            { $match: {Brand: brand.toUpperCase()}},
            { $group: {_id: '$Model'}},
            { $sort: {_id: 1}},
            { $project: {_id: 0, Model: "$_id"}}
        ])
            .exec(function (err, models) {
                if (err) {
                    console.log(err)
                    return next(err)
                }

                callback(models)
            })
    },

    submodels: function (brand, model, callback) {
        Cars.aggregate([
            { $match: {
                    Brand: brand.toUpperCase(),
                    Model: model.toUpperCase()
                }
            },
            { $group: {_id: '$Submodel'}},
            { $sort: {_id: 1}},
            { $project: {_id: 0, Submodel: "$_id"}}
        ])
            .exec(function (err, submodels) {
                if (err) {
                    console.log(err)
                    return next(err)
                }

                callback(submodels)
            })
    },

    types: function (brand, model, submodel, callback) {
        Cars.find({
                Brand: brand.toUpperCase(),
                Model: model.toUpperCase(),
                Submodel: submodel.toUpperCase()
            },
            {
                _id: 0,
                fuel: 1,
                Trim: 1,
                seats: 1,
                'ex-seats': 1,
                KW: 1
            },
            function (err, types) {
            if (err) {
                console.log(err)
                return next(err)
            }

            callback(types)

        })
    }

}


module.exports = operations