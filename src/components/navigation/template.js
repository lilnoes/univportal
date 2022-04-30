import Footer from "./footer";

export default function Template() {
  return (
    <>
      <div className="w-full h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-3xl p-2 text-primaryd font-bold">
            Leon Emmanuel - DASHBOARD
          </h1>
          <div className="w-full bg-primary h-[1px] my-2"></div>
        </div>
        <div className="flex">
          <div className="w-1/4 bg-yellow-300">
            <h2>Courses</h2>
          </div>
          <div className="grow bg-green-500">
            <h2>Recent Activities</h2>
            <h2>Announcements</h2>
          </div>
          <div className="w-1/4 bg-yellow-300">
            <button>New Course</button>
          </div>
        </div>
      </div>
      <div className="w-full h-[80px]">
        <Footer />
      </div>
    </>
  );
}
