import fetcher from "lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { departments, years, countries, titles } from "lib/config";

export default function Home() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("student");
  const [title, setTitle] = useState(titles[0]);
  const [country, setCountry] = useState(countries[0]);
  const [department, setDepartment] = useState(departments[0]);
  const [year, setYear] = useState(1);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (email.trim().endsWith("@ogr.iuc.edu.tr")) setType("student");
    else if (email.trim().endsWith("@iuc.edu.tr")) setType("teacher");
  }, [email]);

  useEffect(() => {
    if (type == "student") setTitle("student");
    else setTitle(titles[0]);
  }, [type]);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div
      className="w-full h-screen flex justify-center"
      style={{ backgroundImage: "url('/images/back.jpg')" }}
    >
      <div className="py-2 px-10 rounded-2xl h-fit mt-5 bg-primary flex justify-center">
        <div className="w-full text-textp flex flex-col justify-start items-center">
          <h1 className="font-bold mb-5 text-2xl">BETTER CANVAS</h1>
          <h1 className="font-bold">YENİ KULLANICI</h1>
          <div className="my-2">
            <label className="block text-sm">İsim</label>
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="text"
              placeholder="İsim"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label className="block text-sm">Soyisim</label>
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="text"
              placeholder="soyisim"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label className="block text-sm">Email</label>
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {type == "teacher" && (
            <div className="my-2">
              <label className="block text-sm">Unvan</label>
              <input
                className="p-1 rounded text-primaryd font-bold"
                type="text"
                placeholder="Unvan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          )}
          <div className="my-2 w-full">
            <label className="block text-sm">Ülke</label>
            <select
              className="p-1 rounded text-primaryd font-bold"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </div>
          {type == "student" && (
            <div className="my-2 w-full">
              <label className="block text-sm">Departman</label>
              <select
                className="p-1 rounded text-primaryd font-bold"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </div>
          )}
          {type == "student" && (
            <div className="my-2 w-full">
              <label className="block text-sm">Yıl</label>
              <select
                className="p-1 rounded text-primaryd font-bold"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {[1, 2, 3, 4].map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
          )}
          <div className="my-2">
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="password"
              placeholder="şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              onClick={async () => {
                const data = await fetcher("/api/account/register", {
                  firstName,
                  lastName,
                  email,
                  title,
                  country,
                  department,
                  year,
                  password,
                });
                if (data.error == "") {
                  router.replace("/account/login");
                  enqueueSnackbar(`yeni kullanıcı "${firstName}" oluşturuldu`, {
                    variant: "success",
                  });
                }
              }}
              className="bg-textp text-secondary font-extrabold p-2 rounded-lg"
            >
              KAYDOL
            </button>
          </div>
          <div>
            <p>
              Hesabın var mı?
              <Link href="/account/login">
                <a className="text-secondaryd ml-3">GİR</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
