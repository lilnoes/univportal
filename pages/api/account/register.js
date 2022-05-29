// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUsersCollection } from "lib/db";
import { withSessionRoute } from "lib/withSession";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    title,
    country,
    department,
    year,
    password,
  } = req.body;
  if (!email) return res.json({ error: "invalid email" });
  const type = email.endsWith("@iuc.edu.tr") ? "teacher" : "student";
  const hash = sha1(password);
  const usersCollection = await getUsersCollection();
  try {
    await usersCollection.insertOne({
      firstName,
      lastName,
      type,
      email,
      title,
      country,
      department,
      year,
      password: hash,
    });
  } catch (e) {
    return res.json({ error: "email error" });
  }
  res.json({ error: "", success: "user created successfully" });
});
