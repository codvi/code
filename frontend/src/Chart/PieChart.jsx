import React, { useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      // Clear any existing chart before rendering a new one
      d3.select("#pie-chart").selectAll("*").remove();

      const width = 600;
      const height = 600;
      const radius = Math.min(width, height) / 2 - 50; // Responsive radius

      const svg = d3
        .select("#pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr(
          "transform",
          `translate(${width / 2}, ${height / 2})`
        ); // Center the chart

      // Sort and aggregate data
      const aggregatedData = [...data]
        .sort((a, b) => b.relevance - a.relevance) // Sort by relevance
        .slice(0, 9); // Top 9 data

      const others = data
        .slice(9)
        .reduce((acc, item) => acc + item.relevance, 0);

      if (others > 0) {
        aggregatedData.push({ pestle: "Others", relevance: others });
      }

      const pie = d3.pie().value((d) => d.relevance);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const arcs = svg
        .selectAll("arc")
        .data(pie(aggregatedData))
        .enter()
        .append("g")
        .attr("class", "arc");

      // Append path and add interaction
      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.pestle))
        .on("mouseover", function (event, d) {
          const [x, y] = d3.pointer(event);
          d3.select("#tooltip")
            .style("left", `${event.pageX + 10}px`) // Tooltip near the cursor
            .style("top", `${event.pageY - 30}px`)
            .style("opacity", 1)
            .html(`<strong>${d.data.pestle}</strong>: ${d.data.relevance}`);
        })
        .on("mousemove", function (event) {
          d3.select("#tooltip")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 30}px`);
        })
        .on("mouseout", function () {
          d3.select("#tooltip").style("opacity", 0);
        });

      // Append labels for larger slices
      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#fff")
        .text((d) => (d.data.relevance > 5 ? d.data.pestle : "")); // Show label for relevance > 5
    }
  }, [data]);

  return (
    <>
      <div id="pie-chart" className="relative"></div> {/* Chart container */}
      <div
        id="tooltip"
        style={{
          position: "absolute",
          background: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
          pointerEvents: "none",
          opacity: 0, // Initially hidden
          transition: "opacity 0.2s ease", // Smooth transition
        }}
      ></div>
    </>
  );
};

export default PieChart;
