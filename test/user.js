import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/')

const TOKEN = 'bde7127d66039c143f8c7b9e6082959baf796380e1e75e0d51d351b3b3638ddc';

describe('CHAI Assertion', () => {

    it('FAILING: chai assertion: callback for it to get completed', (completed) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            //console.log(err);
            //console.log(res.body);
            expect(res.body.data).is.empty;
            completed();
        })
    });

    it('PASSING: chai assertion: callback for it to get completed', (completed) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
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
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).is.not.empty;
        })
    });

    it('without implicit callback', () => {
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).is.not.empty;
        })
    });

    it('GET: user/id', () => {
        return request.get(`users/123?access-token=${TOKEN}`).then((res) => {
            console.log(res.status);
            expect(res.status, "Expecting Status Code to be 200").to.equal(201);
        })
    });

    it('Foreach', () => {
        const url = `users?access-token=${TOKEN}&page=1&gender=Female&status=Active`;
        return request.get(url).then((res) => {
            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach((data) => {
                //console.log(data);
                expect(data.gender).to.eq('Female');
                expect(data.status).to.eq('Active');
            });
        });

    });

    it('POST: create user', (done) => {
        const payLoad = {
            email: '',
            name: 'Test Name',
            gender: 'Male',
            status: 'Active'
        }
        request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(payLoad)
            .end((err, res) => {
                console.log(res.body);
                expect(res.body.code).to.eq(422);
                done();
            })


    });

    it('POST: create user', async () => {
        const payLoad = {
            email: `test${Math.floor(Math.random() * 8888)}@mail.com`,
            name: 'Test Name',
            gender: 'Male',
            status: 'Active'
        }
        var userId;// not working outside of end
        request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(payLoad)
            .then(() => {
                expect(res.body.code).to.eq(201);
                deleteUserByID(userId);
                //done();
            });
        // .end((err, res) => {
        //     console.log(res.body);
        //     userId = res.body.data.id;
        //     console.log("User created with ID: " + userId);
        //     expect(res.body.code).to.eq(201);
        //     // below works, but taking more time
        //     //deleteUserByID(userId);
        //     //done();
        // })

        //console.log(`UserID   out of if: ${userId}`);

        function deleteUserByID(id) {
            console.log("User deletion method");
            request
                .delete('users/' + id)
                .set('Authorization', `Bearer ${TOKEN}`)
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.body.code).to.eq(204);
                })
        }





    });


});