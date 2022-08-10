

import { request } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';

import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';


// declare global {
//   namespace NodeJs {
//     interface Global {
//       signin(): => string[];
//     }
//   }
// }

declare global { 
  var signin: () => string[];
}

jest.mock('../nats-wrapper')


let mongo:any;

beforeAll(async () => {

  process.env.JWT_KEY = 'adadadad';
  mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach( async() => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});


global.signin = () => {
  // Build a JWT payload

  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    emial: 'test@tet.com'
  };

  // Create the JWT

  const token = jwt.sign(payload,process.env.JWT_KEY!);

  // Build session Obj

  const session = { jwt: token };

  // Turn session into JSON

  const sessionJSON = JSON.stringify(session);

  // Take json and encode it into base64

  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return cookie

  return [`session=${base64}`];

};
