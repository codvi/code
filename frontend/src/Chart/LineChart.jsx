import React, { useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      d3.select("#line-chart").selectAll("*").remove(); 

      const svg = d3.select("#line-chart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 300);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.added)))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.intensity)])
        .range([height, 0]);

      const line = d3.line()
        .x(d => x(new Date(d.added)))
        .y(d => y(d.intensity));

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append("g")
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return <div id="line-chart" className="h-64"></div>;
};

export default LineChart;
