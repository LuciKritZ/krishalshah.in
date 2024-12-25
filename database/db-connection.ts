import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { connection: null, promise: null };
}

export async function dbConnection() {
  if (cached.connection) {
    console.log('=====> Using existing Mongoose connection <=====');
    return cached.connection;
  }

  try {
    if (!cached.promise) {
      console.log('<===== Creating new Mongoose connection');
      const options = {
        bufferCommands: false,
      };

      cached.promise = mongoose
        .connect(MONGO_URI, options)
        .then((mongoose) => mongoose);
    }

    cached.connection = await cached.promise;
    console.log('... connected =====>');
    return cached.connection;
  } catch (error) {
    console.error(
      `Error while connecting to the database: ${error}`,
      '======>'
    );
  }
}
