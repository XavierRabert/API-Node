import express from "express"; // require -> commonJS
// import mysql from "mysql2/promise";
import { createGamesRouter } from "./routes/gamesRoutes.js";
import { corsMiddleware } from "./middlewares/cors.js";

export const createApp = ({ gameModel }) => {
  const app = express();
  app.use(express.json());
  app.use(corsMiddleware());
  app.use(express.json());
  app.disable("x-powered-by");

  app.use("/games", createGamesRouter({ gameModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
// const config = {
//   host: "localhost",
//   user: "root",
//   port: 3306,
//   password: "root",
//   database: "boardgames",
// };

// const connection = await mysql.createConnection(config);
