const { response } = require('express');
const express = require('express');
const app = express();
const request = require('supertest');
const expect = require('chai').expect;

app.get('/first',(err, res)=>{
    res.status(200).json({"OK":"Response"});
});

describe('First Test',()=>{
    it('OK Response',()=>{
        request(app)
        .get('/first')
        .end((err, res)=>{
            expect(res.statusCode).to.be.equal(200);
        })
    });
    it('Mocky OK',(done)=>{
        request('https://run.mocky.io')
        .get('/v3/3ace8d91-3eb9-4fa4-bbb9-cbe69ffe3269')
        .expect(200, done)
    })
})

