import mongoose from "mongoose";

const isConnected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected to database!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptopia",
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
