import mongoos from "mongoose";

const connectDB = async () => {
  try {
    const conne = await mongoos.connect(process.env.MONGO_URI);
    console.log(`✅ connected to the database: ${conne.connection.host}`);
  } catch (error) {
    console.log("❌ Error connecting to the server: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
