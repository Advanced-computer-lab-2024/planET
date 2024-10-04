import { Document, ObjectId } from 'mongoose';

export interface ISlot extends Document {
 
  title: string;
  description: string;
  from: string; // Assuming time is stored as a string
  to: string; // Assuming time is stored as a string
  createdAt?: Date;
  updatedAt?: Date;
}