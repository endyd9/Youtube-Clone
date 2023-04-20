import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  location: { type: String, default: "No" },
});

userSchema.pre("save", async function () {
  console.log("Users pass", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("hash pass", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
