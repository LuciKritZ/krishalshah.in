import { Mongoose } from 'mongoose';

export declare global {
  declare namespace globalThis {
    var _mongoose: {
      connection: Mongoose | null;
      promise: null | Promise<Mongoose>;
    };
  }
}
