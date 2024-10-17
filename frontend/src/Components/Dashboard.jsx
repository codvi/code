import React, { useState, useEffect } from "react";
import BarChart from "../Chart/BarChart";
import LineChart from "../Chart/LineChart";
import PieChart from "../Chart/PieChart";
import DonutChart from "../Chart/DonutChart";
import RadarChart from "../Chart/RadarChart";
// import ScatterChart from "../Chart/ScatterChart";
// import AreaChart from "../Chart/AreaChart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filterInputs, setFilterInputs] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pest: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  const [filters, setFilters] = useState({});

  // Fetch data only when filters are applied
  useEffect(() => {
    const query = new URLSearchParams(filters).toString();
    if (query) {
      fetch(`http://localhost:3000/api/data/filter?${query}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterInputs({ ...filterInputs, [name]: value });
  };

  const applyFilters = () => {
    setFilters(filterInputs);
  };

  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Filters</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="end_year"
            placeholder="End Year"
            value={filterInputs.end_year}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={filterInputs.topic}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="sector"
            placeholder="Sector"
            value={filterInputs.sector}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={filterInputs.region}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="pest"
            placeholder="PEST"
            value={filterInputs.pest}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={filterInputs.source}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="swot"
            placeholder="SWOT"
            value={filterInputs.swot}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={filterInputs.country}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filterInputs.city}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
        </div>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      <div className="ml-30 m-auto flex">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Relevance by Country
          </h3>
          <div className="h-screen">
            <BarChart data={data} />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Intensity over Time
          </h3>
          <div className="w-full h-64">
            <LineChart data={data} />
          </div>
        </div>

        <div className="p-6 m-auto bg-white rounded-lg shadow-md col-span-2">
  <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
    PESTLE Distribution
  </h3>
  <div className="flex justify-center items-center w-full h-[400px]">
    <PieChart data={data} />
  </div>
</div>


        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Risk Distribution
          </h3>
          <div className="w-full h-64">
            <DonutChart data={data} />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Trend Analysis
          </h3>
          <div className="w-full h-64">
            <RadarChart data={data} />
          </div>
        </div>

        {/* <div className="p-6 bg-white rounded-lg shadow-md col-span-2">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Area Impact over Years
          </h3>
          <div className="w-full h-64">
            <AreaChart data={data} />
          </div>
        </div> */}
       
      </div>
    </div>
  );
};

export default Dashboard;
