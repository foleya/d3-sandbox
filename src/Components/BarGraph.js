import React, { useEffect, useRef } from "react";
import { axisBottom, axisLeft, scaleLinear, scaleBand, select } from "d3";
import funDataJson from "../Data/nilheimFunCount.json";

const BarGraph = () => {
  const data = funDataJson;

  const svgRef = useRef();

  const width = 500;
  const height = 310;
  // const margin = { top: 0, right: 0, bottom: 30, left: 30 };

  useEffect(() => {
    const svg = select(svgRef.current);

    // VALUE HELPERS
    const xValue = d => d.fun;
    const yValue = d => d.player;

    // SCALES
    const xScale = scaleLinear()
      .domain([0, 6]) // max function here!
      .range([0, width]);

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, height])
      .padding([0.2]);

    // AXES
    const xAxis = axisBottom(xScale).ticks(data.length);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    const yAxis = axisLeft(yScale)
      .ticks(data.length)
      .tickSizeOuter(0);

    svg.select(".y-axis").call(yAxis);

    // BARS
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("width", d => xScale(xValue(d)))
      .attr("height", yScale.bandwidth())
      .attr("y", d => yScale(yValue(d)))
      .attr("fill", "steelblue");
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );
};

export { BarGraph };
