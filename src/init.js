import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 3000;

const handleListening = () =>
  console.log(` ✅ Sever Runing on port ${PORT} 🚀`);

app.listen(PORT, handleListening);
