import path from "path";
import express from "express";
import env from "dotenv";
env.config();
import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("build"));
app.use(express.json());

// import cors from "cors";
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// API
app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  const pathIndex = path.resolve("build", "index.html");
  res.sendFile(pathIndex);
});

app.use((req, res) => {
  res.status(404).json({ msg: "Page Not Found" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ msg: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server Start: http://localhost:${port}`);
});
