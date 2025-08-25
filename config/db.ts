import mongoose from "mongoose";

export const connectToDb = () => {
  try {
    if (!process.env.MONGO_URL) {
      throw console.error(
        "MONGO_URL is not defined in the environment variables"
      );
    }
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
