import Message from "components/icons/message";
import NewAnnouncement from "components/modals/NewAnnouncement";
import NewCourseModal from "components/modals/NewCourse";
import LeftMenu from "components/navigation/menu";
import TemplateInbox from "components/navigation/templateinbox";
import { useState } from "react";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  return (
    <TemplateInbox
      page="inbox"
      title={<h1 className="text-3xl p-2 text-primaryd font-bold">Messages</h1>}
      main={
        <div className="flex h-full">
          <div className="w-[40%]">
            <h2 className="bg-secondaryd text-white font-bold p-2">
              RECIPIENTS
            </h2>
            <div className="flex justify-between p-2">
              <h2 className="font-bold">PROGRAMMING Application</h2>
              <div className="flex items-center">
                <p>3</p>
                <Message fill="fill-primaryd" />
              </div>
            </div>
            <hr className="my-2" />
          </div>
          <div className="grow mx-2 relative max-h-full">
            <div className="bg-secondaryd text-white font-bold p-5">
              <h2>PROGRAMMING APPLICATION</h2>
            </div>
            <div className="mb-[50px]">
              <div className="p-2 bg-gray-300 my-2 float-right w-[60%] rounded-lg">
                <p>Message 1 from teacher</p>
                <p className="text-xs float-right">May 1st, 2022</p>
              </div>
              <div className="clear-both"></div>
              <div className="p-2 bg-gray-300 my-2 float-left w-[60%] rounded-lg">
                <p>Message 1 from teacher</p>
                <p className="text-xs float-right">May 1st, 2022</p>
              </div>
              <div className="clear-both"></div>
            </div>
            <div className="absolute bottom-2 h-[50px] left-0 flex w-full">
              <div className="grow mr-5">
                <input
                  className="block w-full p-2 border-[1px] border-primaryl rounded-lg"
                  type="text"
                />
              </div>
              <div>
                <button className="bg-primary text-white p-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      left={<LeftMenu />}
    />
  );
}
