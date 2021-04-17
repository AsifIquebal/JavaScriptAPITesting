import request from '../config/goRest';
import { expect } from 'chai';


const TOKEN = "bde7127d66039c143f8c7b9e6082959baf796380e1e75e0d51d351b3b3638ddc";

describe.only('Posts', () => {
    let user, postId;

    describe('POST', () => {
        it.only('/posts', async () => {
            const usersPostsdata = {
                user_id: 4,
                title: "test title asus",
                body: "test body asus"
            };

            const res = await request
                .post('posts')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(usersPostsdata);

            expect(res.body.data).to.deep.include(usersPostsdata);
            postId = res.body.data.id;
            console.log(postId);
        });

        // dependent on previous test
        // it('posts/:id', async () => {
        //     if (postId) {
        //         await request
        //             .get(`posts/${postId}`)
        //             .set('Authorization', `Bearer ${TOKEN}`)
        //             .expect(200);
        //     } else {
        //         throw new Error(`postId is invalid - ${postId}`);
        //     }
        // });

    });

    describe('Negative Tests', () => {
        it('422 Data validation failed', async () => {
            const data = {
                user_id: user.id,
                title: '',
                body: faker.lorem.paragraphs(),
            };

            const res = await request
                .post(`posts`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data);

            expect(res.body.code).to.eq(422);
            expect(res.body.data[0].message).to.eq("can't be blank");
        });

        it('401 Authentication failed', async () => {
            const data = {
                user_id: user.id,
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs(),
            };

            const res = await request.post(`posts`).send(data);

            expect(res.body.code).to.eq(401);
            expect(res.body.data.message).to.eq('Authentication failed');
        });
    });
});