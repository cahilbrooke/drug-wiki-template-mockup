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
    let page = req.params.page;
    if(!page.endsWith(".html")) {
      page += ".html";
    }

    let pages_root = path.join(PUBLIC_PATH, "pages");

    let attempted_path = path.join(pages_root, page);

    if (fs.existsSync(attempted_path)) {
      res.sendFile(attempted_path);
    } else {
      attempted_path = path.join(pages_root, "drugs", page);
      if (fs.existsSync(attempted_path)) {
        res.sendFile(attempted_path);
      } else {
        next();
      }
    }

  }
);

export default router;
