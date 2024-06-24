import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDatabase from "./config/db";
import authRouter from "./routes/auth.route";
import pokeRouter from "./routes/pokemon.route";
import authenticateJWT from "./middleware/auth.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDatabase();

app.use(cors())
app.use(express.json())

app.get("/", authenticateJWT, (req: Request, res: Response) => {
  res.send("Hello!");
});

app.use("/api/auth", authRouter)
app.use("/api/pokemon", pokeRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});