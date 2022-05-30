import useUser from "hooks/user/useUser";
import Footer from "./footer";

export default function Template({ title, main, right, left, page, base }) {
  const { user } = useUser();
  if (!user) return <div></div>;
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <div>
          {title}
          {!title && (
            <h1 className="text-3xl p-2 text-primaryd font-bold">
              {user.firstName.toUpperCase()} {user.lastName.toUpperCase()} -
              DASHBOARD
            </h1>
          )}
          <div className="w-full bg-primary h-[1px] my-2"></div>
        </div>
        <div className="grow flex">
          <div className="w-1/4">{left}</div>
          <div className="grow">{main}</div>
          <div className="w-1/4">{right}</div>
        </div>
        <div className="w-full h-[80px]">
          <Footer base={base} selected={page} />
        </div>
      </div>
    </>
  );
}
