import classNames from "classnames";
import Dashboard from "components/icons/dashboard";
import Education from "components/icons/education";
import Inbox from "components/icons/inbox";
import Logout from "components/icons/logout";
import Person from "components/icons/person";
import Courses from "components/modals/Courses";
import { useState } from "react";

export default function Footer({ selected }) {
  const [active, setActive] = useState(selected ?? "dashboard");
  const [showCourses, setShowCourses] = useState(false);
  return (
    <div className="flex w-full h-full">
      <Courses show={showCourses} hide={() => setShowCourses(false)} />
      <MenuItem
        Icon={Dashboard}
        display="Dashboard"
        setActive={() => {
          setActive("dashboard");
        }}
        selected={active == "dashboard"}
      />
      <MenuItem
        Icon={Education}
        display="Courses"
        setActive={() => {
          setShowCourses(true);
          setActive("courses");
        }}
        selected={active == "courses"}
      />
      <MenuItem
        Icon={Inbox}
        display="Inbox"
        setActive={() => {
          setActive("inbox");
        }}
        selected={active == "inbox"}
      />
      <MenuItem
        Icon={Person}
        display="Account"
        setActive={() => {
          setActive("account");
        }}
        selected={active == "account"}
      />
      <MenuItem
        Icon={Logout}
        display="Logout"
        setActive={() => {
          setActive("logout");
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
