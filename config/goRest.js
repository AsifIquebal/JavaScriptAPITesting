import properties from './properties'
import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest(properties.baseUrl);

export default request;