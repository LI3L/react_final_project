import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import randomColor from "randomcolor";
import { useUser } from "./UserContext";

const data2 = [
  { name: "Success", total: 10 },
  { name: "Failure", total: 5 },
];
ChartJS.register(ArcElement, Tooltip, Legend);

const PiChart = () => {
  const { user, setUserContext } = useUser();
  // Helper function to generate an array of random colors
  const generateRandomColors = (numColors) => {
    return randomColor({
      count: numColors,
      format: "rgba", // Use RGBA format for transparency
    });
  };

  // Use useMemo to generate colors once and memoize the result
  const colors = useMemo(() => generateRandomColors(data2.length), [data2]);

  const options = {
    maintainAspectRatio: false,
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
    width: 50, // Set the width of the chart
    height: 50,
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
};

export default PiChart;
