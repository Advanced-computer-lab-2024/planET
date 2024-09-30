import { Location } from "@/types/Location";
import { Document, ObjectId } from "mongoose";

export interface IActivity extends Document {
  category: ObjectId;
  comments: ObjectId[];
  name: string;
  date: Date;
  time: string;
  location: Location; // [longitude, latitude];
  price?: number; // Single price (optional)
  price_range?: {
    // Price range (optional) check the users story 21 in azure
    min: number;
    max: number;
  };
  special_discount?: number;
  tags?: string[];
  booking_flag: boolean;
  inappropriate_flag: boolean;
  active_flag: boolean;
  advertiser_id: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IActivityDTO {
  date: Date;
  time: string;
  location: Location; // [longitude, latitude];
  price?: number; // Single price (optional)
  price_range?: {
    // Price range (optional)
    min: number;
    max: number;
  };
  category: ObjectId;
  special_discount?: number;
  tags?: string[];
  booking_flag: boolean;
  adverstier_id: ObjectId;
}
