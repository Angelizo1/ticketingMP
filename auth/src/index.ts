import mongoose from 'mongoose';
import { app } from './app';

const start = async() => {
  console.log("This is for testing");

  if(!process.env.JWT_KEY){
    throw new Error('JWT must be defined');
  }

  if(!process.env.MONGO_URI){
    throw new Error('MONGO URI must be defined');
  }

  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongo');
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, ()=>{
    console.log('Listening on 3000!!!');
  });
};

start();
