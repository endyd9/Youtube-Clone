import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(` ✅ Sever Runing on port ${PORT} 🚀`);

app.listen(PORT, handleListening);
