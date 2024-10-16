import React, { useState, useEffect } from 'react';
import AreaChart from '../Chart/AreaChart'; // Import the AreaChart component
import BarChart from '../Chart/BarChart';   // Import the BarChart component
import axios from 'axios';

const Dashboard = () => {
  // State for data and filters
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    city: '',
    intensity: '',
    relevance: ''
  });

  // Fetch filtered data from the backend when filters are updated
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/data/filter', {
        params: filters, // Passing the filters as query parameters
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component loads
  }, []); // Empty dependency to fetch data on load

  // Update the filters state when input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Submit handler to trigger fetching of filtered data
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(); // Fetch data based on filters
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Data Dashboard</h1>
      </div>

      {/* Filter Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Input fields for filters */}
          {Object.keys(filters).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block mb-2 font-semibold text-gray-700 capitalize">{key.replace('_', ' ')}</label>
              <input
                type={key === 'end_year' || key === 'intensity' || key === 'relevance' ? 'number' : 'text'}
                id={key}
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition duration-200"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Area Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Area Chart</h2>
          <AreaChart data={data} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Bar Chart</h2>
          <BarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
