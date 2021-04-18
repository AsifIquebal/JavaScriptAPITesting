import supertest from 'supertest';
import properties from '../config/properties';
const request = supertest(properties.baseUrl);
export default request;