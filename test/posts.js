import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/')


const TOKEN = "bde7127d66039c143f8c7b9e6082959baf796380e1e75e0d51d351b3b3638ddc";

describe.only('Create User, Create Post, Delete Post, Delete User', () => {
    let user, postId, userId;

    it('Create a user', async () => {
        const userDataPayLoad = {
            email: `test${Math.floor(Math.random() * 8888)}@mail.com`,
            name: 'Test Name',
            gender: 'Male',
            status: 'Active'
        }
        const res = await request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(userDataPayLoad);
        // .then(() => {
        //     expect(res.body.code).to.eq(201);
        // });
        //console.log(res.body.data.id);
        userId = res.body.data.id;


    });
    console.log("User created with ID: " + userId);

    it('/posts', async () => {
        const usersPostsdata = {
            user_id: userId,
            title: "test title asus",
            body: "test body asus"
        };

        let res = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(usersPostsdata);
        console.log(res.body);
        expect(res.body.data).to.deep.include(usersPostsdata);
        postId = res.body.data.id;
        //console.log(postId);
    });

    it('delete user', async () => {
        console.log("Deleting user by userId: " + userId);
        let res = await request
            .delete('users/' + userId)
            .set('Authorization', `Bearer ${TOKEN}`);
        console.log("User Deletion Status Code: " + res.code);
    });
});