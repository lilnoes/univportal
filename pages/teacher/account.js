import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import { useState } from "react";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  return (
    <Template
      page={"account"}
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          Leon Emmanuel ISHIMWE
        </h1>
      }
      main={
        <div className="">
          <h1 className="text-xl font-bold mb-5">Settings</h1>
          <div className="my-3">
            <span className="text-sm text-gray-700">Full name: </span>
            <span>Leon Emmanuel ISHIMWE</span>
          </div>
          <div className="my-3">
            <span className="text-sm text-gray-700">Display: </span>
            <input type="text" value="Leon" />
          </div>
          <div className="my-3">
            <span className="text-sm text-gray-700">Email: </span>
            <input type="email" value="ishimwe@gmail.com" />
          </div>
        </div>
      }
      right={<div></div>}
    />
  );
}
