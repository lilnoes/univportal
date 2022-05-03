import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div
      className="w-full h-screen flex justify-center"
      style={{ backgroundImage: "url('/images/back.jpg')" }}
    >
      <div className="p-10 h-fit mt-10 bg-primary flex justify-center">
        <div className="w-full text-textp flex flex-col justify-start items-center mb-3">
          <h1 className="font-bold mb-5 text-2xl">BETTER CANVAS</h1>
          <h1 className="font-bold">USER LOGIN</h1>
          <div>
            <input
              className="my-3 p-1 rounded text-primaryd font-bold"
              type="email"
              placeholder="username"
              value={email}
              onChange={(val) => setEmail(val.target.value)}
            />
          </div>
          <div>
            <input
              className="my-3 p-1 rounded text-primaryd font-bold"
              type="password"
              placeholder="password"
            />
          </div>

          <div>
            <button
              onClick={() => {
                if (email.includes("ogr")) router.replace("/student");
                else router.replace("/teacher");
              }}
              className="bg-textp text-secondary font-extrabold p-2 rounded-lg"
            >
              LOGIN
            </button>
          </div>
          <div>
            <p>
              Don't have an account?
              <Link href="/account/register">
                <a className="text-secondaryd ml-3">REGISTER</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
