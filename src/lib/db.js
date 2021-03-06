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

export async function getAnnouncementsCollection() {
  if (init) await initDb();
  const db = client.db(dbName);
  return db.collection("announcements");
}

export async function getQuizCollection() {
  if (init) await initDb();
  const db = client.db(dbName);
  return db.collection("quizzes");
}

export async function getEnrollmentCollection() {
  if (init) await initDb();
  const db = client.db(dbName);
  return db.collection("enrollments");
}

export async function getGradesCollection() {
  if (init) await initDb();
  const db = client.db(dbName);
  return db.collection("grades");
}

export async function getMessagesCollection() {
  if (init) await initDb();
  const db = client.db(dbName);
  return db.collection("messages");
}

async function initDb() {
  await client.connect();
  init = false;
  const usersCollection = await getUsersCollection();
  const coursesCollection = await getCoursesCollection();
  const enrollmentsCollection = await getEnrollmentCollection();
  const gradesCollection = await getGradesCollection();

  //emails must be unique
  await usersCollection.createIndex({ email: 1 }, { unique: true });

  //shortnames must be unique
  await coursesCollection.createIndex({ shortName: 1 }, { unique: true });

  //enrollment should be unique
  await enrollmentsCollection.createIndex(
    { student: 1, course: 1 },
    { unique: true }
  );

  //grade should be unique
  await gradesCollection.createIndex({ student: 1, quiz: 1 }, { unique: true });
  //initialise indices
}
