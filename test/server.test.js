var expect = require('chai').expect

var operations = require('./../controllers/operations.js')

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

                console.log(types)

                expect(types.length).to.be.above(1)
                done()
            })
        })

    })
})