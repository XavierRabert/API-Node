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
  static async getAll({ genre }) {
    console.log("getAll");

    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        "SELECT id, title FROM genre WHERE LOWER(title) = ?;",
        [lowerCaseGenre]
      );

      // no genre found
      if (genres.length === 0) return [];

      // get the id from the first genre result
      const [{ id }] = genres;

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      return [];
    }
  }

  static async getAllGames() {
    const [games] = await connection.query(
      "SELECT  BIN_TO_UUID(id) id , title FROM game "
    );

    return games;
  }

  static async getGame({ id }) {
    const [game] = await connection.query(
      "SELECT  BIN_TO_UUID(id) id , title FROM game WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    return game ?? [];
  }
}
