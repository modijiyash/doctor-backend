// addDoctor.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  phone: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

async function addDoctor() {
  try {
    if (!MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined in .env");
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas");

    const data = {
      name: "Dr. Div Raj",
      email: "dr.div@example.com",
      password: await bcrypt.hash("div1", 10),
      specialization: "Cardiology",
      phone: "9876543210",
    };

    const doc = await Doctor.create(data);
    console.log("✅ Doctor added:", doc);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error adding doctor:", err.message);
    process.exit(1);
  }
}

addDoctor();
