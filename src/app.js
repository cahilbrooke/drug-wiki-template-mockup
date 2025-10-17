import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_PATH = path.join(process.cwd());

export const SRC_PATH = path.join(__dirname);
export const DATA_PATH = path.join(ROOT_PATH, "data");

export const PRIVATE_PATH = path.join(SRC_PATH, "private");
export const PUBLIC_PATH = path.join(SRC_PATH, "public");

// 404 redirect to home
app.use((req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
