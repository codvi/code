import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const AreaChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      // Clear previous chart if any
      d3.select(chartRef.current).selectAll("*").remove(); // Set chart dimensions based on the container

      const containerWidth = chartRef.current.clientWidth;
      const containerHeight = 300; // Fixed height, adjust if needed

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom; // Create the SVG container

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`); // X and Y scales

      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => new Date(d.year)))
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.intensity)])
        .range([height, 0]); // Area generator

      const area = d3
        .area()
        .x((d) => x(new Date(d.year)))
        .y0(height)
        .y1((d) => y(d.intensity))
        .curve(d3.curveBasis); // Optional: makes the curve smoother // Gradient for fill

      const defs = svg.append("defs");
      defs
        .append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%")
        .selectAll("stop")
        .data([
          { offset: "0%", color: "#34D399", opacity: 0.8 }, // Tailwind Green
          { offset: "100%", color: "#34D399", opacity: 0 }, // Transparent green
        ])
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color)
        .attr("stop-opacity", (d) => d.opacity); // Draw the area

      svg
        .append("path")
        .datum(data)
        .attr("fill", "url(#area-gradient)")
        .attr("d", area); // X-axis

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)); // Y-axis

      svg.append("g").call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div
      ref={chartRef}
      className="w-full h-64 bg-white rounded-lg shadow-lg p-4"
    >
            {/* The chart will be rendered inside this div */}   {" "}
    </div>
  );
};

export default AreaChart;
