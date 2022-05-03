import LeftMenu from "components/navigation/menu";
import Template from "components/navigation/template";
import "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import { useEffect, useLayoutEffect } from "react";

export default function Home() {
  const labels = ["Quiz 1", "midterm", "final", "but"];
  const x = [80, 10, 70, 20];
  const data = {
    labels,
    datasets: [{ label: "Grades", data: x, backgroundColor: "#007172" }],
  };
  const options = {
    scales: { y: { min: 0, max: 100 }, x: { ticks: { color: "#007172" } } },
  };

  return (
    <Template
      base={"student"}
      title={
        <h1 className="text-3xl p-2 text-primaryd font-bold">
          PROGRAMMING APPLICATION - Dashboard
        </h1>
      }
      main={
        <div className="">
          <Line data={data} options={options} />
        </div>
      }
      left={<LeftMenu base={"student"} />}
    />
  );
}
