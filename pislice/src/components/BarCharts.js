// components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ atrributes }) {
  const data = {
    labels: atrributes[0],
    datasets: [
      {
        label: "# of Orders",
        data: atrributes[1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",

          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <main className="flex  flex-col items-center w-full ">
      <div className="w-[700px] h-[350px]">
        <Bar data={data} options={options} />
      </div>
    </main>
  );
}
