import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api')

const TOKEN = 'bde7127d66039c143f8c7b9e6082959baf796380e1e75e0d51d351b3b3638ddc';

describe('CHAI Assertion', () => {

    it('FAILING: chai assertion: callback for it to get completed', (completed) => {
        request.get(`/users?access-token=${TOKEN}`).end((err, res) => {
            //console.log(err);
            //console.log(res.body);
            expect(res.body.data).is.empty;
            completed();
        })
    });

    it('PASSING: chai assertion: callback for it to get completed', (completed) => {
        request.get(`/users?access-token=${TOKEN}`).end((err, res) => {
            //console.log(err);
            //console.log(res.body);
            expect(res.body.data).is.not.empty;
            completed();
        })
    });

    // it('with async', async () => {
    //     const res = await request.get(`/users?access-token=${TOKEN}`);
    //     expect(res.body.data).is.not.empty;
    // });

    it('without implicit callback', () => {
        return request.get(`/users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).is.not.empty;
        })
    });

    it('without implicit callback', () => {
        return request.get(`/users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).is.not.empty;
        })
    });

    it.only('GET: user/id', () => {
        return request.get(`/users/123?access-token=${TOKEN}`).then((res) => {
            console.log(res.body);
            expect(res.body.data).is.not.empty;
        })
    });

});