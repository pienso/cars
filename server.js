var express = require('express');
var app = express();
var morgan = require('morgan')

var env = process.env.NODE_ENV || 'dev'
var config = require('./config/' + env);


var operations = require('./controllers/operations')

app.use(morgan('dev'))
app.disable('x-powered-by')

//console.log('process.env: ' + JSON.stringify(process.env, null, 2));


app.get('/', function(req, res) {
    operations.brands(function (brands) {
        /*
        brands.forEach(function(brand, index, brands)
        {
            brands[index].url = 'aaa'
        })*/

        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(brands, null, 2))
    })
})

app.get('/:brand', function(req, res) {
    operations.models(req.params.brand, function (models) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(models, null, 2))
    })
})

app.get('/:brand/:model', function(req, res) {
    operations.submodels(req.params.brand, req.params.model, function (submodels) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(submodels, null, 2))
    })
})

app.get('/:brand/:model/:submodel', function(req, res) {
    operations.types(req.params.brand, req.params.model, req.params.submodel, function (types) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(types, null, 2))
    })
})

app.listen(config.port)

console.log('Server running at http://localhost:' + config.port + '/')

module.exports = app

