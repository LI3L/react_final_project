import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart() {
  const data = {
    labels: [
      "Geeksforgeeks",
      "Technical scripter",
      "Geek-i-knack",
      "Geek-o-mania",
    ],
    datasets: [
      {
        label: "Number of Students",
        data: [400, 700, 200, 1000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
