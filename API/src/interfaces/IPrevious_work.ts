import { Document, ObjectId } from 'mongoose';

export interface IPrevious_Work extends Document {
 
  title: string;
  place: string;
  from: Date;
  to: Date;
  createdAt?: Date;
  updatedAt?: Date;
}