import React, { useEffect } from 'react';
import * as d3 from 'd3';

const AreaChart = ({ data }) => {
  useEffect(() => {
    if (data.length > 0) {
      d3.select("#area-chart").selectAll("*").remove(); 

      const svg = d3.select("#area-chart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 300);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.year)))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.intensity)])
        .range([height, 0]);

      const area = d3.area()
        .x(d => x(new Date(d.year)))
        .y0(height)
        .y1(d => y(d.intensity));

      g.append("path")
        .datum(data)
        .attr("fill", "lightblue")
        .attr("d", area);

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append("g")
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div id="area-chart" className="h-64"></div>
  );
};

export default AreaChart;
