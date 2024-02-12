import React from "react";
import { Pie } from "react-chartjs-2";

export default function Pai() {
  const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { name: "Geek-o-mania", students: 1000 },
  ];

  return <Pai data={data} />;
}
