import Footer from "./footer";

export default function Template() {
  return (
    <>
      <div className="w-full h-[calc(100vh-80px)] bg-red-500">
        <div>
          <h1>Leon Emmanuel - DASHBOARD</h1>
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
