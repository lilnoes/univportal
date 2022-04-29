import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[30%] bg-primary flex justify-center">
        <div className="w-[70%] text-textp flex flex-col justify-center items-center mt-10 mb-3">
          <div>
            <h1 className="font-bold">USER LOGIN</h1>
          </div>
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
