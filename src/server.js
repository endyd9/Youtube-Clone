import express from "express";

const PORT = 4000;

const app = express();

const handelHome = () => console.log("Someone want go Home");

app.get("/", handelHome);

const handleListening = () => console.log(` ✅ Sever on port ${PORT} 🚀`);

app.listen(PORT, handleListening);
