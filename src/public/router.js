// /src/public/router.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PUBLIC_PATH } from "../app.js"; // reuse the exported PUBLIC_PATH

const router = express.Router();

// Serve index.html for root route
router.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, "pages", "index.html"));
});

export default router;
