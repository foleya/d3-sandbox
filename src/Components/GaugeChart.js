import React, { useEffect, useRef, useState } from "react";
import { select, arc, pie, interpolate } from "d3";

import useResizeObserver from "../CustomHooks/useResizeObserver";
import Styles from "./Styles.module.scss";

const GaugeChart = () => {
  const [data, setData] = useState([0.5, 0.5]);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const arcGenerator = arc()
      .innerRadius(75)
      .outerRadius(150);

    const pieGenerator = pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);
    const instructions = pieGenerator(data);

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("stroke", "black")
      .attr("fill", (instruction, index) => (index === 0 ? "steelblue" : "ddd"))
      .style(
        "transform",
        `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
      )
      .transition()
      .attrTween("d", function(nextInstruction) {
        const interpolator = interpolate(this.lastInstruction, nextInstruction);
        this.lastInstruction = interpolator(1);
        return function(t) {
          return arcGenerator(interpolator(t));
        };
      });

    // draw the guage
  }, [data, dimensions]);

  return (
    <div
      ref={wrapperRef}
      className={Styles.SvgWrapper}
      onClick={() => {
        const left = Math.random();
        setData([left, 1 - left]);
      }}
    >
      <svg className={Styles.Svg} ref={svgRef}></svg>
    </div>
  );
};

export { GaugeChart };
