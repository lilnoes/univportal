import fetcher from "lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      className="w-full h-screen flex justify-center"
      style={{ backgroundImage: "url('/images/back.jpg')" }}
    >
      <div className="p-10 h-fit mt-10 bg-primary flex justify-center">
        <div className="w-full text-textp flex flex-col justify-start items-center mb-3">
          <h1 className="font-bold mb-5 text-2xl">BETTER CANVAS</h1>
          <h1 className="font-bold">KULLANICI GİRİŞİ</h1>
          <div>
            <input
              className="my-3 p-1 rounded text-primaryd font-bold"
              type="email"
              placeholder="email"
              value={email}
              onChange={(val) => setEmail(val.target.value)}
            />
          </div>
          <div>
            <input
              className="my-3 p-1 rounded text-primaryd font-bold"
              type="password"
              placeholder="şifre"
              value={password}
              onChange={(val) => setPassword(val.target.value)}
            />
          </div>

          <div>
            <button
              onClick={async () => {
                const json = await fetcher("/api/account/login", {
                  email,
                  password,
                });
                const user = json?.data?.user;
                if (!user) return;
                if (user.type == "teacher") router.push("/teacher");
                if (user.type == "student") router.push("/student");
              }}
              className="bg-textp text-secondary font-extrabold py-2 px-4 rounded-lg"
            >
              GİR
            </button>
          </div>
          <div>
            <p>
              Hesabın yok mu?
              <Link href="/account/register">
                <a className="text-secondaryd ml-3">KAYDOL</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
