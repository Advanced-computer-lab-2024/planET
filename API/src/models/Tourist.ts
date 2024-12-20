import { ITourist } from "@/interfaces/ITourist";
import TouristBadge from "@/types/enums/touristBadge";
import mongoose from "mongoose";

const touristSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    job: {
      type: String,
      required: true,
    },
    nation: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      required: true,
      default: 0,
    },
    loyality_points: {
      type: Number,
      default: 0,
    },
    total_loyality_points: {
      type: Number,
      default: 0,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    badge: {
      type: String,
      enum: Object.values(TouristBadge),
      default: TouristBadge.LEVEL1,
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files", // Reference the correct collection
    },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    preferences: [
      //for tags
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

const Tourist = mongoose.model<ITourist & mongoose.Document>(
  "Tourist",
  touristSchema
);

export default Tourist;
