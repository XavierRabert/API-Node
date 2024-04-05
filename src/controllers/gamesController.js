import { z } from "zod";
import { validateGame, validatePartialGame } from "../schemes/gamesSchemes.js";

export class GameController {
  constructor({ gameModel }) {
    this.gameModel = gameModel;
  }

  getAllGames = async (req, res) => {
    const games = await this.gameModel.getAllGames();
    return res.json(games);
  };

  getGame = async (req, res) => {
    const { id } = req.params;
    const game = await this.gameModel.getGame({ id });
    return res.json(game);
  };

  getGamesGenre = async (req, res) => {
    const { id: genre_id } = req.params;
    console.log(genre_id);
    const validate = z.object({ id: z.string().uuid() }).safeParse(genre_id);
    console.log("VALID----->", validate);
    const games = await this.gameModel.getGamesGenre({ genre_id });
    if (games) return res.json(games);
    res.status(404).json({ message: "Game not found" });
  };

  createGame = async (req, res) => {
    const result = validateGame(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newGame = await this.gameModel.create({ input: result.data });
    res.status(201).json(newGame);
  };

  deleteGame = async (req, res) => {
    const { id } = req.params;
    const result = await this.gameModel.delete({ id });
    if (result) return res.json(result);
    res.status(404).json({ message: "Game not found" });
  };

  updateGame = async (req, res) => {
    const result = validatePartialGame(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const game = await this.gameModel.update({ input: result.data });
    if (game) return res.json(game);
    res.status(404).json({ message: "Game not found" });
  };
}
