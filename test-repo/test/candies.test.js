//Mocha is a popular Javascript testing framework that supports
//synchronous and asynchronous testing styles

// chai is an assertion library that can be used with any 
// testing framework, though often Mocha, it provides different
// assertion styles such as should, expect and assert 

// should an expect are both assertion styles in chai with different syntaxes 
// should is closer to  natural language 
// here we requires these modules from the Chai library 
const should = require('chai').should();
const expect = require('chai').expect;

// supertest is a JS library used to test http servers and apis and is often used with Chai for making assertions 
const supertest = require('supertest');

//Here we are saying we want to make http requests to routers contained in app.js 
const api = supertest(require('../app.js'));

describe("GET /candies", () => {
     // before each is a hook in mocha, aka a reusable function, that allows us to set up the test environment before writing our tests 
     beforeEach(async () => {
        response = await api
        // get makes our get request
        .get("/candies")
        // set sets up the request header to tell the server the format in which the client expects to receive the response 
        .set("Accept", "application/json");
    });

     // it is a mocha function that allows us to describe a test case 
     it("should return a 200 response", () => {
        // expect syntax is part of the chai library and is often used with supertest to make assertions about HTTP requests and responses 
        expect(response.status).to.equal(200);
    }); 

    it("should return an array", () => {
        // expect(response.body).to.be.an('array');
        // using the should syntax from the chai library to assert that the response body is an array 
        response.body.should.be.an('array');
    });


    it("should return an array of objects that have a field called 'id', 'name' and 'property' ", () => {
        console.log(response.body)
        response.body.forEach(candy => {
            // here we are chaining chai methods, should gives us access to have, which allows us access to property 
            // which allows us to specify the name of a property 
            candy.should.have.property('id');
            candy.should.have.property('name');
            candy.should.have.property('color');
        });
    });
});

    // test case for POST /candies
describe('POST /candies', () => {
    
    // Let's set up the test environment with a known state 
    const newCandy = {
    id: 5,
    name: 'Lollipop',
    color: 'Red',
    };

    // called before any tests are run, allowing us to set up test environment with a known state, 
    // making it easier to write and maintain tets 
    beforeEach(async() => {
        // send new candy over 
        response = await api
        .post('/candies')
        .set('Accept', 'application/json')
        .send(newCandy)
    });

    it("should return a 201 response", () => {
        // expect syntax is part of the chai library and is often used with supertest to make assertions about HTTP requests and responses 
        expect(response.status).to.equal(201);
    }); 

    it('should add a candy object to the candies collection and return it', () => {
        // newly added candy should be an object 
        newlyAddedCandy = response.body.find(candy => candy.id === newCandy.id);
        newlyAddedCandy.should.be.an('object');
    });
});
