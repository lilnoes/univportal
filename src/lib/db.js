import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "univportal";
const client = new MongoClient(url);

let init = true;

export async function getUsersCollection() {
  if (init) await initDb();
  const db = client.db(dbName);
  return db.collection("users");
}

export async function getCoursesCollection() {
  if (init) await initDb();
  const db = client.db(dbName);
  return db.collection("courses");
}

async function initDb() {
  await client.connect();
  const usersCollection = await getCoursesCollection();
  await usersCollection.createIndex({ email: 1 }, { unique: true });
  //initialise indices
}
