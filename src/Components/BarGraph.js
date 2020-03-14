import React, { useEffect, useState } from "react";
import { csv, scaleLinear, set } from "d3";
import killcountcsv from "../Data/nilheimkillcount.csv";

const BarGraph = () => {
  const [bars, setBars] = useState([]);
  const width = 400;
  const height = 400;

  const fetchData = async () => {
    let bars = [];
    const data = await csv(killcountcsv);
    data.forEach(datum => {
      bars.push({ player: datum.player, murders: +datum.murders });
    });
    setBars(bars);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <svg width={width} height={height}>
      {bars.map((d, index) => (
        <rect key={index} height={100} width={100} fill={"steelblue"} />
      ))}
    </svg>
  );
};

export { BarGraph };
