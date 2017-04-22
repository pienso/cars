process.env.NODE_ENV = 'test';

var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http')
var should = chai.should()

var server = require('../server')

var operations = require('./../controllers/operations.js')

chai.use(chaiHttp)

describe('/GET', () => {
    it('/ should return brands', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                res.body.length.should.be.gt(20)
                done()
            })
    })

    it('/audi should return models', (done) => {
        chai.request(server)
            .get('/audi')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                res.body.length.should.be.gt(5)
                done()
            })
    })

    it('/audi/a3 should return submodels', (done) => {
        chai.request(server)
            .get('/audi/a3')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                res.body.length.should.be.gt(3)
                done()
            })
    })

    it('/audi/a3/sportback should return cars', (done) => {
        chai.request(server)
            .get('/audi/a3/sportback')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                res.body.length.should.be.gt(1)
                done()
            })
    })
})



describe('Operations', function() {
    describe('get brands function', function() {
        it('should be a function', function() {
            expect(operations.brands).to.be.a('function')
        })

        it('should return an array', function(done) {
            operations.brands(function (brands) {
                expect(brands).to.be.an('array')
                done()
            })
        })

        it('should return more than 10', function(done) {
            operations.brands(function (brands) {
                expect(brands.length).to.be.above(10)
                done()
            })
        })
    })


    describe('get models function', function() {
        it('should be a function', function() {
            expect(operations.models).to.be.a('function')
        })

        it('should return an array', function(done) {
            operations.models('AUDI', function (models) {
                expect(models).to.be.an('array')
                done()
            })
        })

        it('should return more than 10', function(done) {
            operations.models('AUDI', function (models) {
                //console.log(models.length)
                expect(models.length).to.be.above(10)
                done()
            })
        })
    })


    describe('get submodels function', function() {
        it('should be a function', function() {
            expect(operations.submodels).to.be.a('function')
        })

        it('should return an array', function(done) {
            operations.submodels('audi', 'a3', function (submodels) {
                expect(submodels).to.be.an('array')
                done()
            })
        })

        it('should return more than 2', function(done) {
            operations.submodels('audi', 'a3', function (submodels) {
                expect(submodels.length).to.be.above(2)
                done()
            })
        })
    })

    describe('get types function', function() {
        it('should be a function', function() {
            expect(operations.types).to.be.a('function')
        })

        it('should return an array', function(done) {
            operations.types('audi', 'a3', 'sportback', function (types) {
                expect(types).to.be.an('array')
                done()
            })
        })

        it('should return more than 1', function(done) {
            operations.types('audi', 'a3', 'sportback', function (types) {
                expect(types.length).to.be.above(1)
                done()
            })
        })

    })
})