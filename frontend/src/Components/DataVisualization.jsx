import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const DataVisualization = () => {
  const [data, setData] = useState([]);

  // Fetch data from your backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data'); // Adjust your backend URL
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // D3 Visualization (basic example for a bar chart)
  useEffect(() => {
    if (data.length > 0) {
      // Clear existing visualization
      d3.select('#chart').selectAll('*').remove();

      // Create your D3.js visualization
      const svg = d3.select('#chart')
        .append('svg')
        .attr('width', 800)
        .attr('height', 400);

      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 60)
        .attr('y', (d) => 400 - d.intensity * 10) // Assuming you want to visualize the intensity field
        .attr('width', 50)
        .attr('height', (d) => d.intensity * 10)
        .attr('fill', 'blue');
    }
  }, [data]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Data Visualization</h1>
      <div id="chart" className="flex justify-center"></div>
    </div>
  );
};

export default DataVisualization;
