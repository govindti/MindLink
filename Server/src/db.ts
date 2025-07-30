import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

mongoose.connect("mongodb+srv://govindti:Govind%407088@job-portal-db.zxoo2.mongodb.net/MindLink")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


interface IUser extends Document {
  username: string;
  password: string;
}


const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});


userSchema.pre("save", async function (this: IUser) {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});


export const UserModel = model<IUser>("User", userSchema);
