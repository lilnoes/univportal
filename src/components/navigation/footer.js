import classNames from "classnames";
import Dashboard from "components/icons/dashboard";
import Education from "components/icons/education";
import Inbox from "components/icons/inbox";
import Logout from "components/icons/logout";
import Person from "components/icons/person";
import Courses from "components/modals/Courses";
import { useState } from "react";
import { useRouter } from "next/router";
import fetcher from "lib/fetcher";
import { mutate } from "swr";

export default function Footer({ base, selected }) {
  const router = useRouter();
  base = base ? base : "teacher";
  const [active, setActive] = useState(selected ?? "dashboard");
  const [showCourses, setShowCourses] = useState(false);
  return (
    <div className="flex w-full h-full">
      <Courses
        base={base}
        show={showCourses}
        hide={() => setShowCourses(false)}
      />
      <MenuItem
        Icon={Dashboard}
        display="Dashboard"
        setActive={() => {
          router.replace(`/${base}`);
        }}
        selected={active == "dashboard"}
      />
      <MenuItem
        Icon={Education}
        display="Dersler"
        setActive={() => {
          setShowCourses(true);
        }}
        selected={active == "courses"}
      />
      <MenuItem
        Icon={Inbox}
        display="Mesajlar"
        setActive={() => {
          router.replace(`/${base}/inbox`);
        }}
        selected={active == "inbox"}
      />
      <MenuItem
        Icon={Person}
        display="Hesap"
        setActive={() => {
          router.replace(`/${base}/account`);
        }}
        selected={active == "account"}
      />
      <MenuItem
        Icon={Logout}
        display="Çikiş"
        setActive={async () => {
          await fetcher("/api/account/logout");
          mutate("/api/account");
          router.replace(`/account/login`);
        }}
        selected={active == "logout"}
      />
    </div>
  );
}

function MenuItem({ display, Icon, selected, setActive }) {
  const withFill = (Icon, selected) => {
    return <Icon fill={selected ? "fill-primaryd" : "fill-white"} />;
  };
  const Wrapped = withFill(Icon, selected);
  return (
    <div
      onClick={setActive}
      className={classNames(
        selected ? "bg-white" : "bg-primaryd",
        "cursor-pointer grow flex flex-col justify-center items-center"
      )}
    >
      <div>{Wrapped}</div>
      <p
        className={classNames(
          selected ? "text-primaryd" : "text-white",
          "font-bold"
        )}
      >
        {display}
      </p>
    </div>
  );
}
