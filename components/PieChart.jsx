import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import randomColor from "randomcolor";

const data2 = [
  { name: "Category 1", total: 40 },
  { name: "Category 2", total: 20 },
  { name: "Category 3", total: 30 },
];

export default function PiChart() {
  // Helper function to generate an array of random colors
  const generateRandomColors = (numColors) => {
    return randomColor({
      count: numColors,
      //   luminosity: "bright",
      format: "rgba", // Use RGBA format for transparency
    });
  };

  // Use useMemo to generate colors once and memoize the result
  const colors = useMemo(() => generateRandomColors(data2.length), [data2]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Success Rate",
        position: "top",
      },
    },
  };

  const data = {
    labels: data2.map((entry) => entry.name),
    datasets: [
      {
        label: "Total: ",
        data: data2.map((entry) => entry.total),
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    data2.length > 0 && (
      <div className="piContainer">
        <Doughnut data={data} options={options} />
      </div>
    )
  );
}
