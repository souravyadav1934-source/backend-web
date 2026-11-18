import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGODBURI;
  if (!mongoUri) {
    throw new Error("MONGODBURI is missing. Add it to your .env file.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully");
}
