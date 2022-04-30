import Link from "next/link";

export default function Home() {
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
              className="my-3 p-1 rounded"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <input
              className="my-3 p-1 rounded"
              type="password"
              placeholder="password"
            />
          </div>

          <div>
            <button className="bg-textp text-secondary font-extrabold p-2 rounded-lg">
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
