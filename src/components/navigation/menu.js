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
            <a className="underline my-5">DUYURULAR</a>
          </Link>
        </li>

        {user?.type != "teacher" && (
          <li className="my-5">
            <Link href={`/${base}/grades`}>
              <a className="underline my-5">PUANLAR</a>
            </Link>
          </li>
        )}
        {user?.type == "teacher" && (
          <li className="my-5">
            <Link href={`/${base}/people`}>
              <a className="underline my-5">ÖĞRENCİLER</a>
            </Link>
          </li>
        )}
        {user?.type == "teacher" && (
          <li className="my-5">
            <Link href={`/${base}/quiz`}>
              <a className="underline my-5">SINAVLAR</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
