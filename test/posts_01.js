require('dotenv').config();
import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = process.env.USER_TOKEN;

describe.only('Create User, Create Post, Delete Post, Delete User', () => {
    let postId, userId;

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
        userId = res.body.data.id;
        console.log("User created with ID: " + userId);
    });

    it('Create a Post by the User', async () => {
        console.log("User created with ID: " + userId);
        const usersPostsdata = {
            user_id: userId,
            title: "test title asus",
            body: "test body asus"
        };
        let res = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(usersPostsdata);
        //console.log(res.body);
        expect(res.body.data).to.deep.include(usersPostsdata);
        postId = res.body.data.id;
        console.log(`User [${userId}] created Post Id: ${postId}`);
    });

    // dependent on previous test
    it('posts/:id', async () => {
        if (postId) {
            let res = await request
                .get(`posts/${postId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .expect(200);
            console.log(res.body);
        } else {
            throw new Error(`postId is invalid - ${postId}`);
        }
    });
    it('Delete Post/:id', async () => {
        if (postId) {
            let res = await request
                .delete(`posts/${postId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .expect(200);
            console.log(res.body);
        } else {
            throw new Error(`postId is invalid - ${postId}`);
        }
    });
    it('delete user', async () => {
        console.log("Deleting user by userId: " + userId);
        let res = await request
            .delete('users/' + userId)
            .set('Authorization', `Bearer ${TOKEN}`);
        console.log("User Deletion Status Code: " + res);
    });

});