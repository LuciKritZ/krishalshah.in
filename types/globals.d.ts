import { Mongoose } from 'mongoose';

export declare global {
  declare module globalThis {
    var _mongoose: {
      connection: Mongoose | null;
      promise: null | Promise<Mongoose>;
    };
  }
}
