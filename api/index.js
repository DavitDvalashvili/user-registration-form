import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";
import upload_router from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// Use the user routes
app.use("/api/users", userRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/", upload_router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
