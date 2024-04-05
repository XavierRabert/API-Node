import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "boardgames",
};

const connection = await mysql.createConnection(config);

export class GameModel {
  static async getGamesGenre({ genre_id }) {
    try {
      const [games] = await connection.query(
        `SELECT game.*, BIN_TO_UUID(id) id FROM game
          JOIN game_genre
          WHERE game.id = game_genre.game_id
          AND game_genre.genre_id = UUID_TO_BIN(?); `,
        [genre_id]
      );

      // no games found
      if (games.length === 0) return null;

      return [games];
    } catch (e) {
      console.log(e);
      return [{ message: "Invalid genre Id" }];
    }
  }

  static async getAllGames() {
    const [games] = await connection.query(
      "SELECT  BIN_TO_UUID(id) id , title FROM game "
    );

    return games;
  }

  static async getGame({ id }) {
    try {
      const [game] = await connection.query(
        "SELECT *, BIN_TO_UUID(id) id FROM game WHERE id = UUID_TO_BIN(?);",
        [id]
      );
      return game ?? [];
    } catch (e) {
      console.log(e);
      return [{ message: "Invalid game Id" }];
    }
  }

  static async create({ input }) {
    const { title, players, age, duration, image, rate } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO game (id, title, players, age, duration, image, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, players, age, duration, image, rate]
      );
    } catch (e) {
      console.log(e);
      throw new Error("Error creating game");
    }

    const [games] = await connection.query(
      `SELECT title, players, age, duration, image, rate, BIN_TO_UUID(id) id
        FROM game WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return games[0];
  }

  static async delete({ id }) {
    try {
      await connection.query("DELETE FROM game WHERE id = UUID_TO_BIN(?);", [
        id,
      ]);
      return [{ message: "Game deleted succesfully" }];
    } catch (e) {
      console.log(e);
      throw new Error("Error deleting game");
    }
  }

  static async update({ id }) {
    try {
      await connection.query(
        `INSERT INTO game (id, title, players, age, duration, image, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, players, age, duration, image, rate]
      );
    } catch (e) {
      console.log(e);
      throw new Error("Error creating game");
    }

    const [games] = await connection.query(
      `SELECT title, players, age, duration, image, rate, BIN_TO_UUID(id) id
        FROM game WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return games[0];
  }
}
