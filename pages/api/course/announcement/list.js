// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getAnnouncementsCollection,
  getCoursesCollection,
  getUsersCollection,
} from "lib/db";
import { withSessionRoute } from "lib/withSession";
import { ObjectId } from "mongodb";

export default withSessionRoute(async (req, res) => {
  const { shortName } = req.body;
  const coursesCollection = await getCoursesCollection();
  const announcementsCollection = await getAnnouncementsCollection();
  const user = req.session.user;
  const course = await coursesCollection.findOne({ shortName });
  console.log(course._id);
  const announcements = await announcementsCollection
    .find({ course: course._id.toString() })
    .toArray();
  res.send({
    error: "",
    success: "announcements fetched",
    data: { announcements },
  });
});
