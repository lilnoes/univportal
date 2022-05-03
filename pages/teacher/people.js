import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";

export default function Home() {
  return (
    <Template
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - People
        </h1>
      }
      main={
        <div className="">
          <table className="w-full">
            <tr className="p-2 font-bold text-xl border-b">
              <td className="p-2">Name</td>
              <td>Surname</td>
              <td>Country</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Leon Emma</td>
              <td>ISHIMWE</td>
              <td>RWANDA</td>
            </tr>
          </table>
        </div>
      }
      left={<LeftMenu />}
    />
  );
}