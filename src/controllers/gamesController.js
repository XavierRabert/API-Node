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
}
