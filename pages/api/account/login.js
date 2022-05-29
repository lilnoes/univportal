// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUsersCollection } from "lib/db";
import { withSessionRoute } from "lib/withSession";
import sha1 from "sha1";

export default withSessionRoute(async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.json({ error: "invalid email" });
  const hash = sha1(password);
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ email });
  if (!user) return res.send({ error: "user not found", success: "" });
  if (user.password != hash)
    return res.send({ error: "invalid password", success: "" });
  delete user.password;
  req.session.user = user;
  await req.session.save();
  res.send({ error: "", success: "user found", data: { user } });
});
