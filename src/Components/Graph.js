import React, { useEffect, useRef, useState } from "react";
import {
  axisBottom,
  axisRight,
  //   curveCardinal,
  //   line,
  //   max,
  select,
  scaleBand,
  scaleLinear
} from "d3";
import ResizeObserver from "resize-observer-polyfill";
import Styles from "./Styles.module.scss";

const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);

    // Cleanup
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};

const Graph = () => {
  const [data, setData] = useState([25, 25, 25, 25, 25, 25, 25]);

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0);

    const yScale = scaleLinear()
      .domain([0, 150]) // todo -- should not be fixed
      .range([dimensions.height, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", value =>
        svg
          .select(".tooltip")
          .transition()
          .attr("opacity", 0)
          .attr("y", yScale(value) - 4)
      )
      .transition()
      .attr("height", value => dimensions.height - yScale(value))
      .attr("fill", colorScale);

    // <-- Line
    // const myLine = line()
    //   .x((value, index) => xScale(index))
    //   .y(yScale)
    //   .curve(curveCardinal);

    // svg
    //   .selectAll(".line")
    //   .data([data])
    //   .join("path")
    //   .attr("class", "line")
    //   .attr("d", myLine)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue");
    // -->

    // <-- Circle
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", value => value)
    //   .attr("cx", value => value * 2)
    //   .attr("cy", value => value * 2)
    //   .attr("stroke", "red");
  }, [data, dimensions]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} className={Styles.SvgWrapper}>
        <svg className={Styles.Svg} ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div className={Styles.ActionsContainer}>
        <button
          onClick={() => setData(data.map(value => value + Math.random() * 10))}
        >
          Update Data
        </button>
        <button onClick={() => setData(data.filter(value => value < 150))}>
          Filter Data
        </button>
      </div>
    </React.Fragment>
  );
};

export { Graph };
