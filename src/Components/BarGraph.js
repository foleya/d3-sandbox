import React, { useEffect, useState } from "react";
import { axisBottom, axisLeft, csv, max, scaleLinear, scaleBand } from "d3";
import killcountcsv from "../Data/nilheimkillcount.csv";

const BarGraph = () => {
  const [data, setData] = useState([]);
  const [bars, setBars] = useState([]);

  const width = 500;
  const height = 500;
  const margin = { top: 0, right: 0, bottom: 30, left: 30 };

  const xValue = d => d.murders;
  const yValue = d => d.player;

  useEffect(() => {
    const fetchData = async () => {
      const data = await csv(killcountcsv);
      setData(data);

      const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, width]);

      const xAxis = axisBottom().scale(xScale);
      // .tickFormat(d3.timeFormat("%b"));

      const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, height])
        .padding([0.3]);

      const yAxis = axisLeft().scale(yScale);
      // .tickFormat(d => `${d}℉`);

      console.log(xAxis, yAxis);

      let bars = [];

      data.forEach(d => {
        console.log(xScale(xValue(d)));
        bars.push({
          player: d.player,
          murders: +d.murders,
          y: yScale(yValue(d)),
          width: xScale(xValue(d)),
          height: yScale.bandwidth()
        });
      });

      setBars(bars);
    };

    if (data.length === 0) {
      fetchData();
    }
  }, [data, margin]);

  console.log(bars);

  return (
    <div>
      <svg width={width} height={height}>
        {bars.map((d, index) => (
          <rect
            key={index}
            y={d.y}
            height={d.height}
            width={d.width}
            fill={"steelblue"}
          />
        ))}
      </svg>
    </div>
  );
};

export { BarGraph };
