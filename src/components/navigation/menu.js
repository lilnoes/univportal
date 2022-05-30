import useUser from "hooks/user/useUser";
import Link from "next/link";

export default function LeftMenu({ base, course }) {
  const { user } = useUser();
  base = base ? base : "teacher";
  return (
    <div className="p-3 text-secondaryd font-extrabold">
      <ul>
        <li className="mb-5">
          <Link href={`/${base}`}>
            <a className="underline my-5">HOME</a>
          </Link>
        </li>
        <li className="my-5">
          <Link href={`/${base}/announcements`}>
            <a className="underline my-5">ANNOUNCEMENTS</a>
          </Link>
        </li>
        <li className="my-5">
          <Link href={`/${base}/inbox`}>
            <a className="underline my-5">MESSAGES</a>
          </Link>
        </li>
        <li className="my-5">
          <Link href={`/${base}/grades`}>
            <a className="underline my-5">GRADES</a>
          </Link>
        </li>
        {user?.type == "teacher" && (
          <li className="my-5">
            <Link href={`/${base}/people`}>
              <a className="underline my-5">PEOPLE</a>
            </Link>
          </li>
        )}
        {user?.type == "teacher" && (
          <li className="my-5">
            <Link href={`/${base}/quiz`}>
              <a className="underline my-5">QUIZZES</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
