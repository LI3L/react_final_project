import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useUser } from "./UserContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PiChart = () => {
  const { user, setUserContext } = useUser();

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
    labels: ["Success", "Failure"],
    datasets: [
      {
        label: "Total: ",
        data: [user && user.success, user && user.failure],
        backgroundColor: ["#2BEC1D", "#FF0000"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    user && (
      <div className="piContainer">
        <Doughnut data={data} options={options} />
      </div>
    )
  );
};

export default PiChart;
