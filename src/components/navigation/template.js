import Footer from "./footer";

export default function Template({ title, main, right, left }) {
  return (
    <>
      <div className="w-full h-[calc(100vh-80px)]">
        <div>
          {title}
          {!title && (
            <h1 className="text-3xl p-2 text-primaryd font-bold">
              Leon Emmanuel - DASHBOARD
            </h1>
          )}
          <div className="w-full bg-primary h-[1px] my-2"></div>
        </div>
        <div className="flex">
          <div className="w-1/4">{left}</div>
          <div className="grow">{main}</div>
          <div className="w-1/4">{right}</div>
        </div>
      </div>
      <div className="w-full h-[80px]">
        <Footer />
      </div>
    </>
  );
}
