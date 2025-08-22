import mongoose, { mongo } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB is connected");
    });
    connection.on("error", (error) => {
      console.log(
        "MongoDB connection Error, please make sure db is up and running:" +
          error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went in connectiong to DataBase");
    console.log(error);
  }
}
