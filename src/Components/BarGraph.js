import React, { useEffect, useRef, useState } from "react";
import { axisBottom, axisLeft, max, scaleLinear, scaleBand, select } from "d3";
import funDataJson from "../Data/nilheimFunCount.json";

const BarGraph = () => {
  const [data, setData] = useState(funDataJson);

  const svgRef = useRef();

  const proportions = {
    width: 500,
    height: 310,
    margin: { top: 0, right: 0, bottom: 30, left: 30 }
  };
  const width = 500;
  const height = 310;
  const margin = { top: 0, right: 0, bottom: 30, left: 30 };

  //   const xValue = d => d.murders;
  //   const yValue = d => d.player;

  //   const xScale = scaleLinear()
  //     .domain([0, max(data, xValue)])
  //     .range([0, width]);
  //   const xAxis = axisBottom().scale(xScale);
  //   // .tickFormat(d3.timeFormat("%b"));
  //   const yScale = scaleBand()
  //     .domain(data.map(yValue))
  //     .range([0, height])
  //     .padding([0.3]);
  //   const yAxis = axisLeft().scale(yScale);
  //   // .tickFormat(d => `${d}℉`);
  //   console.log(xAxis, yAxis);
  //   let bars = [];
  //   data.forEach(d => {
  //     console.log(xScale(xValue(d)));
  //     bars.push({
  //       player: d.player,
  //       murders: +d.murders,
  //       y: yScale(yValue(d)),
  //       width: xScale(xValue(d)),
  //       height: yScale.bandwidth()
  //     });
  //   });
  //   setBars(bars);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xValue = d => d.fun;
    const yValue = d => d.player;

    const xScale = scaleLinear()
      .domain([0, 6])
      .range([0, proportions.width]);

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, height])
      .padding([0.2]);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("width", d => xScale(xValue(d)))
      .attr("height", yScale.bandwidth())
      .attr("y", d => yScale(yValue(d)))
      .attr("fill", "steelblue");
  }, [data, proportions]);

  return (
    <React.Fragment>
      <svg ref={svgRef} width={width} height={height} />
    </React.Fragment>
  );
};

export { BarGraph };
