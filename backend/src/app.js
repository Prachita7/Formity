import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import formRoutes from "./routes/form.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Form Builder API is running 🚀" });
});

export default app;
