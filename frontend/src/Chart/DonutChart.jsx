import React, { useEffect } from "react";
import * as d3 from "d3";

const DonutChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      d3.select("#donut-chart").selectAll("*").remove();

      const svg = d3
        .select("#donut-chart")
        .append("svg")
        .attr("width", 300)
        .attr("height", 300)
        .append("g")
        .attr("transform", "translate(150, 150)");

      const radius = 100; // Outer radius for the donut chart
      const innerRadius = 50; // Inner radius for the hole

      const aggregatedData = [...data]
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 9);
      const others = data
        .slice(9)
        .reduce((acc, item) => acc + item.relevance, 0);
      if (others > 0) {
        aggregatedData.push({ pestle: "Others", relevance: others });
      }

      const pie = d3.pie().value((d) => d.relevance);
      const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const arcs = svg
        .selectAll("arc")
        .data(pie(aggregatedData))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.pestle))
        .on("mouseover", function (event, d) {
          const [x, y] = d3.pointer(event);
          d3.select("#tooltip")
            .style("left", `${x + 20}px`)
            .style("top", `${y - 20}px`)
            .style("opacity", 1)
            .html(`<strong>${d.data.pestle}</strong>: ${d.data.relevance}`);
        })
        .on("mouseout", function () {
          d3.select("#tooltip").style("opacity", 0);
        });

      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text((d) => (d.data.relevance > 5 ? d.data.pestle : ""));
    }
  }, [data]);

  return (
    <>
      <div id="donut-chart" className="h-64"></div>
      <div
        id="tooltip"
        style={{
          position: "absolute",
          background: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
          pointerEvents: "none",
          opacity: 0,
        }}
      ></div>
    </>
  );
};

export default DonutChart;
