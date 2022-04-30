import classNames from "classnames";
import Dashboard from "components/icons/dashboard";
import Education from "components/icons/education";
import Inbox from "components/icons/inbox";
import Logout from "components/icons/logout";
import Person from "components/icons/person";
import { useState } from "react";

export default function Footer({ selected }) {
  const [active, setActive] = useState(selected ?? "dashboard");
  return (
    <div className="flex w-full h-full">
      <MenuItem
        Icon={Dashboard}
        display="Dashboard"
        setActive={setActive}
        selected={active == "dashboard"}
      />
      <MenuItem
        Icon={Education}
        display="Courses"
        setActive={setActive}
        selected={active == "courses"}
      />
      <MenuItem
        Icon={Inbox}
        display="Inbox"
        setActive={setActive}
        selected={active == "inbox"}
      />
      <MenuItem
        Icon={Person}
        display="Account"
        setActive={setActive}
        selected={active == "account"}
      />
      <MenuItem
        Icon={Logout}
        display="Logout"
        setActive={setActive}
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
  const name = display.toLowerCase();
  return (
    <div
      onClick={() => setActive(name)}
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
