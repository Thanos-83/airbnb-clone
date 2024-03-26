import mongoose from 'mongoose';

const connection = {};
const connectdb = async () => {
  if (connection.isConnected) {
    return;
  }
  try {
    const uri = process.env.MONGO_URL;
    // console.log('Mongo Url: ', uri);
    const db = await mongoose.connect(uri);
    connection.isConnected = db.connections[0].readyState;
    console.log(`MongoDB connected: ${connection.isConnected} `);
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;
