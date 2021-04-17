import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = "bde7127d66039c143f8c7b9e6082959baf796380e1e75e0d51d351b3b3638ddc";

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

export function deleteUser(userId) {
    //function deleteUser(userId, done) {
    console.log("Deleting user by userId: " + userId);
    let response = request
        .delete(`users/${userId}`)
        //https://gorest.co.in/public-api/users/1287
        .set('Authorization', `Bearer ${TOKEN}`);
    console.log("User Deletion Status Code: " + response.code);
}