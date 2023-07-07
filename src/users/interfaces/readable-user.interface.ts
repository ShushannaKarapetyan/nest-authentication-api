import Mongoose from 'mongoose';

export interface IReadableUser {
  readonly _id: Mongoose.Types.ObjectId;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}