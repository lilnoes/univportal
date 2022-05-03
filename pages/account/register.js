import Link from "next/link";

export default function Home() {
  return (
    <div
      className="w-full h-screen flex justify-center"
      style={{ backgroundImage: "url('/images/back.jpg')" }}
    >
      <div className="py-2 px-10 rounded-2xl h-fit mt-10 bg-primary flex justify-center">
        <div className="w-full text-textp flex flex-col justify-start items-center">
          <h1 className="font-bold mb-5 text-2xl">BETTER CANVAS</h1>
          <h1 className="font-bold">CREATE USER</h1>
          <div className="my-2">
            <label className="block text-sm">First Name</label>
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="text"
              placeholder="First name"
            />
          </div>
          <div className="my-2">
            <label className="block text-sm">Last Name</label>
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div className="my-2">
            <label className="block text-sm">Email</label>
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="my-2 w-full">
            <label className="block text-sm">Country</label>
            <select className="p-1 rounded text-primaryd font-bold">
              <option>Rwanda</option>
              <option>Turkey</option>
              <option>Angola</option>
            </select>
          </div>
          <div className="my-2 w-full">
            <label className="block text-sm">Department</label>
            <select className="p-1 rounded text-primaryd font-bold">
              <option>Computer engineering</option>
              <option>Chemical engineering</option>
            </select>
          </div>
          <div className="my-2 w-full">
            <label className="block text-sm">Year</label>
            <select className="p-1 rounded text-primaryd font-bold">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="my-2">
            <input
              className="p-1 rounded text-primaryd font-bold"
              type="password"
              placeholder="password"
            />
          </div>

          <div>
            <button className="bg-textp text-secondary font-extrabold p-2 rounded-lg">
              REGISTER
            </button>
          </div>
          <div>
            <p>
              Have an account?
              <Link href="/account/login">
                <a className="text-secondaryd ml-3">LOGIN</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
