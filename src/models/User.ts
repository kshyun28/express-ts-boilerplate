import { Schema, model } from 'mongoose';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  active: boolean;
  activationToken: string;
  created: Date;
  updated?: Date;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  activationToken: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

export const User = model('User', UserSchema);
