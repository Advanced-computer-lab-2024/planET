import ComplaintStatus from "@/types/enums/complaintStatus";
import { Document, ObjectId } from "mongoose";

export interface IComplaint extends Document {
  tourist_id: ObjectId;
  title: string;
  date: Date;
  body: string;
  status: ComplaintStatus;
  reply?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IComplaintCreateDTO {
  title: string;
  date?: string;
  body: string;
}
