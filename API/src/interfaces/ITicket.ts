import TicketType from "@/types/enums/ticketType";
import { Document, ObjectId } from "mongoose";
import mongoose from "mongoose";

export interface ITicket extends Document {
  tourist_id: ObjectId;
  type: TicketType;
  booking_id: ObjectId;
  price: Number;
  cancelled: boolean;
  points_received: Number;
  createdAt?: Date;
  updatedAt?: Date;
  time_to_attend: Date;
}

export interface ITicketBooking {
  tourist_id?: ObjectId;
  type: TicketType;
  booking_id: ObjectId;
  booking_name: string;
  price: Number;
  cancelled: boolean;
  points_received: Number;
  time_to_attend: Date;
  image?: mongoose.Schema.Types.ObjectId;
}
