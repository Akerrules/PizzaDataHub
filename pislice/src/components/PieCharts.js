import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({ test }) {
  console.log(test);
  const data = {
    labels: test[0], //need to provide label like happy sad
    datasets: [
      {
        label: "# of Votes",
        data: test[1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
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

  return (
    <main>
      <div>
        <Pie data={data} />
      </div>
    </main>
  );
}
