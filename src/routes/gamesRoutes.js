import { Router } from "express";
import { GameController } from "../controllers/gamesController.js";

export const createGamesRouter = ({ gameModel }) => {
  const gamesRouter = Router();

  const gameController = new GameController({ gameModel });

  gamesRouter.get("/", gameController.getAllGames);
  gamesRouter.post("/", gameController.createGame);

  gamesRouter.get("/:id", gameController.getGame);
  gamesRouter.delete("/:id", gameController.deleteGame);
  gamesRouter.get("/genre/:id", gameController.getGamesGenre);

  return gamesRouter;
};
