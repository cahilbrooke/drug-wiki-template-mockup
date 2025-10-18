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

router.get(["/:page", "/:page.html"],
  (req, res, next) => {
    console.log(req.params.page);
  }
);

router.get("/:page", (req, res, next) => {

  let drugsDir = path.join(PUBLIC_PATH, "pages", "drugs");

    const filePath = path.join(drugsDir, `${req.params.page}.html`);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });

export default router;
