import { Router } from "express";
import { GameController } from "../controllers/gamesController.js";

export const createGamesRouter = ({ gameModel }) => {
  const gamesRouter = Router();

  const gameController = new GameController({ gameModel });

  gamesRouter.get("/", gameController.getAllGames);
  gamesRouter.get("/:id", gameController.getGame);

  return gamesRouter;
};
