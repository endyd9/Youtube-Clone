import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const heandleOpen = () => console.log(" ✅ Connected to DB");
const heandleError = (error) => console.log(" ❌ DB error", error);

db.on("error", heandleError);
db.once("open", heandleOpen);
