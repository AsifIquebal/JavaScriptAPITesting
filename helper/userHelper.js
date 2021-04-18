require('dotenv').config();
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = process.env.USER_TOKEN;
export const createUser = async () => {
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
    return res.body.data.id;
}
export const deleteUser = async (id) => {
    //export function deleteUser(id) {
    //function deleteUser(userId, done) {
    console.log("Deleting user by userId: " + id);
    let response = await request
        .delete(`users/${id}`)
        //https://gorest.co.in/public-api/users/1287
        .set('Authorization', `Bearer ${TOKEN}`);
    console.log("User Deletion Status Code: " + response.status);
    console.log("User Deletion Status Code: " + response.text);
    console.log("User Deletion Status Code: " + response.body.code);
}