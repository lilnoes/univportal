import Footer from "./footer";

export default function TemplateInbox({ title, main, left }) {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <div>
          {title}
          {!title && (
            <h1 className="text-3xl p-2 text-primaryd font-bold">
              Leon Emmanuel - DASHBOARD
            </h1>
          )}
          <div className="w-full bg-primary h-[1px] my-2"></div>
        </div>
        <div className="grow flex h-full">
          <div className="w-1/4">{left}</div>
          <div className="grow">{main}</div>
        </div>
        <div className="w-full h-[80px]">
          <Footer />
        </div>
      </div>
    </>
  );
}
