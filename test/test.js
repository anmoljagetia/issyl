/*jslint node: true */
/*global describe: false, before: false, after: false, it: false */
"use strict";

// Declaration of the variables used
var expect = require('chai').expect,
    request = require('request'),
    server = require('../index'),
    redis = require('redis'),
    client;

//connecting to the redis client
client = redis.createClient();

// Server tasks
describe('server', function () {

    // Beforehand, start the server
    before(function (done) {
        console.log('Starting the server...');
        done();
    });

    // Afterwards, stop the server and empty the database
    after(function (done) {
        console.log('Stopping the server...');
        client.flushdb();
        done();
    });

    // Test the index route
    describe('Test the index route', function () {
        it('should return a page with the title ISSYL', function (done) {
            request.get({ url: 'http://localhost:5000' }, function (error, response, body) {
                expect(body).to.include('ISSYL');
                expect(response.statusCode).to.equal(200);
                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
                done();
            });
        });
    });

    // Test submitting a URL for google.co.uk
    describe('Test submitting a URL', function () {
        it('should return the shortened URL', function (done) {
            request.post('http://localhost:5000', {form: {url: 'http://www.google.co.uk'}}, function (error, response, body) {
                expect(body).to.include('Your shortened URL is');
                expect(response.statusCode).to.equal(200);
                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
                done();
            });
        });
    });

    
    // Test following a URL
    describe('Test following a URL', function () {
        it('should redirect the user to the shortened URL', function (done) {
            // Create the URL
            client.set('testurl', 'http://www.google.com', function () {
                // Follow the link
                request.get({
                    url: 'http://localhost:5000/testurl',
                    followRedirect: false
                }, function (error, response, body) {
                    expect(response.headers.location).to.equal('http://www.google.com');
                    expect(response.statusCode).to.equal(301);
                    done();
                });
            });
        });
    });

    // Test non-existent link
    describe('Test following a non-existent-link', function () {
        it('should return a 404 error', function (done) {
            // Follow the link
            request.get({
                url: 'http://localhost:5000/nonexistenturl',
                followRedirect: false
            }, function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                expect(body).to.include('Link not found');
                done();
            });
        });
    });

});

