// /src/public/router.js
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { PUBLIC_PATH } from "../app.js";

const router = express.Router();

router.get(["/", "/index", "/index.html"],
  (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, "pages", "index.html"));
  }
);

router.get(["/discord", "/discords", "discord-partners", "/discord-partners.html"],
  (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, "pages", "discord-partners.html"));
  }
);

router.get(["/list/methamphetamine", "/list/methamphetamine.html"],
  (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, "pages", "list", "meth.html"));
  }
);

// ✅ Auto-serve any .html file in /pages
router.get("*", (req, res, next) => {
  try {
    // Normalize and clean the requested path
    let requestedPath = req.path;

    // Remove leading/trailing slashes
    if (requestedPath.startsWith("/")) requestedPath = requestedPath.slice(1);

    // Default to index.html if path is empty
    if (!requestedPath) requestedPath = "index";

    // If it doesn’t end with .html, assume it should
    if (!requestedPath.endsWith(".html")) {
      requestedPath += ".html";
    }

    // Construct the full file path
    const fullPath = path.join(PUBLIC_PATH, "pages", requestedPath);

    // Check if the file exists
    if (fs.existsSync(fullPath)) {
      res.sendFile(fullPath);
    } else {
      // File not found → continue to next middleware (404 redirect)
      next();
    }
  } catch (err) {
    next(err);
  }
});

export default router;
