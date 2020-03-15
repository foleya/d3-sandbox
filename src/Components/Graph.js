import React, { useEffect, useRef, useState } from "react";
import { curveCardinal, line, select } from "d3";
import killcountcsv from "../Data/nilheimkillcount.csv";

const Graph = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const myLine = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveCardinal);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "steelblue");
    // Circle Example
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", value => value)
    //   .attr("cx", value => value * 2)
    //   .attr("cy", value => value * 2)
    //   .attr("stroke", "red");
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br />
      <button
        onClick={() => setData(data.map(value => value + Math.random() * 10))}
      >
        Update Data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter Data
      </button>
    </React.Fragment>
  );
};

export { Graph };
