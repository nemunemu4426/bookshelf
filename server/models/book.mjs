import { Schema, model } from "mongoose";
const bookShema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
      get: (val) => Math.round(val),
      set: (val) => Math.round(val),
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookShema);
export default Book;
