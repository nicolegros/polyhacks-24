import { OptionalId } from "mongodb";
import clientPromise from "../lib/mongo";

export class Repository {

  async getAll(): Promise<unknown> {
    try {
      const client = await clientPromise;
      const db = client.db("hackaton24");

      const farmers = await db
        .collection("farmers")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();
      return farmers;

    } catch (e) {
      console.error(e);
    }
  };

  async create(farmer: unknown) {
    try {
      const client = await clientPromise;
      const db = client.db("hackaton24");

      const farmers = await db
        .collection("farmers")
        .insertOne(farmer as OptionalId<Document>);
      return farmers;

    } catch (e) {
      console.error(e);
    }

  }
}
