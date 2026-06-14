import mongoose from 'mongoose';

if (typeof window !== 'undefined') {
  throw new Error('dbConnection can only be used on the server.');
}

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

interface MongooseCache {
  conn: null | typeof mongoose;
  promise: null | Promise<typeof mongoose>;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export function clearModelIfLocal(modelName: string) {
  if (process.env.NODE_ENV !== 'production' && mongoose.models[modelName]) {
    delete mongoose.models[modelName];
  }
}

export async function dbConnection() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGO_URI, opts).then(m => {
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
