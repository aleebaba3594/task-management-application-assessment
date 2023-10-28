import mongoose from 'mongoose';

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected with db");
  } catch (error) {
    console.log(error, "not connected with db");
  }
}

export default dbConnection;