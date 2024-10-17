import { useEffect } from "react";
import * as d3 from "d3";

const RadarChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      d3.select("#radar-chart").selectAll("*").remove();

      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2 - 40;

      const svg = d3
        .select("#radar-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const maxRelevance = d3.max(data, (d) => d.relevance);
      const angles = data.map((d, i) => (i * 2 * Math.PI) / data.length);

      // Create the radial grid lines
      for (let i = 0; i < data.length; i++) {
        svg
          .append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", radius * Math.cos(angles[i]))
          .attr("y2", radius * Math.sin(angles[i]))
          .attr("stroke", "#ccc");
      }

      // Draw the radar area
      const radarLine = d3
        .lineRadial()
        .angle((d, i) => angles[i])
        .radius((d) => (d.relevance / maxRelevance) * radius)
        .curve(d3.curveLinearClosed); // Close the path for radar chart

      svg
        .append("path")
        .datum(data)
        .attr("d", radarLine)
        .attr("fill", "rgba(0, 123, 255, 0.5)")
        .attr("stroke", "#007bff")
        .attr("stroke-width", 2)
        .on("mouseover", function () {
          d3.select(this).attr("fill", "rgba(0, 123, 255, 0.8)");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "rgba(0, 123, 255, 0.5)");
        });

      // Add labels for each axis
      data.forEach((d, i) => {
        svg
          .append("text")
          .attr("x", (radius + 20) * Math.cos(angles[i])) // Offset for better visibility
          .attr("y", (radius + 20) * Math.sin(angles[i]))
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("fill", "#333")
          .text(d.pestle);
      });

      // Tooltip setup
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("pointer-events", "none")
        .style("opacity", 0);

      // Handle hover interaction
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (d.relevance / maxRelevance) * radius * Math.cos(angles[i]))
        .attr("cy", (d, i) => (d.relevance / maxRelevance) * radius * Math.sin(angles[i]))
        .attr("r", 5)
        .attr("fill", "#007bff")
        .on("mouseover", function (event, d) {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 30}px`)
            .style("opacity", 1)
            .html(`<strong>${d.pestle}</strong>: ${d.relevance}`);
        })
        .on("mouseout", function () {
          tooltip.style("opacity", 0);
        });
    }
  }, [data]);

  return <div id="radar-chart" className="relative h-64"></div>;
};

export default RadarChart;
