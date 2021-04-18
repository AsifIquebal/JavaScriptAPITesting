require('dotenv').config();
require("mocha-allure-reporter");
import request from '../config/goRest';
import { expect } from 'chai';
import { createUser, deleteUser } from '../helper/userHelper';

const TOKEN = process.env.USER_TOKEN;

describe.only('Create Post, Get Post, Delete Post', () => {

    const testStep = allure.createStep("{0}", () => {

    });

    let postId, userId;

    before(async () => {
        userId = await createUser();
    });

    it('Create a Post by the User', async () => {
        testStep("Hello World");
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

    after(async () => {
        await deleteUser(userId);
    });

});