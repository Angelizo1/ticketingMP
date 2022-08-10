import request from 'supertest';
import { app } from '../../app';

it('fails when email does not exist in supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'atest@test.com',
      password: '8444478965'
    })
    .expect(400)
});

it('fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'atest@test.com',
      password: '8444478965'
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
});