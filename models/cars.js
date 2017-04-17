var db = require('../config/db')
var Cars = db.model('cars', {
    fuel: {type: Number, required: true},
    sequencenumber: {type: Number, required: true},
    Brand: {type: String, required: true},
    Model: {type: String, required: true},
    Submodel: {type: String, required: true},
    seats: {type: String, required: true},
    'ex-seats': {type: String, required: true},
    KW: {type: Number, required: true},
    dateupdate: {type: Number, required: true}
})

module.exports = Cars