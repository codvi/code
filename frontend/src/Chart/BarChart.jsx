import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      d3.select("#bar-chart").selectAll("*").remove(); 

      const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 300);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 2950 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.relevance)])
        .range([height, 0]);

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.country))
        .attr("y", d => y(d.relevance))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.relevance))
        .attr("fill", "purple");

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append("g")
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div id="bar-chart" className="h-64"></div>
  );
};

export default BarChart;
