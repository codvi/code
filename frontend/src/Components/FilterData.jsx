import React, { useEffect } from 'react';
import axios from 'axios';

const Filter = ({ filters, setFilters, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to fetch filtered data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data', {
        params: {
          end_year: filters.end_year || undefined,
          topic: filters.topic || undefined,
          sector: filters.sector || undefined,
          region: filters.region || undefined,
          pestle: filters.pestle || undefined,
          source: filters.source || undefined,
          swot: filters.swot || undefined,
          country: filters.country || undefined,
          city: filters.city || undefined,
        },
      });

      setData(response.data); // Set the filtered data for display
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data based on the current filters
    fetchData();
  }, [filters]); // Depend on filters to refetch data when they change

  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-4 shadow-md rounded-lg">
      {/* End Year Filter */}
      <div>
        <label className="block text-gray-700">End Year</label>
        <input
          type="number"
          name="end_year"
          value={filters.end_year}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Topic Filter */}
      <div>
        <label className="block text-gray-700">Topic</label>
        <input
          type="text"
          name="topic"
          value={filters.topic}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Sector Filter */}
      <div>
        <label className="block text-gray-700">Sector</label>
        <input
          type="text"
          name="sector"
          value={filters.sector}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Region Filter */}
      <div>
        <label className="block text-gray-700">Region</label>
        <input
          type="text"
          name="region"
          value={filters.region}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* PEST Filter */}
      <div>
        <label className="block text-gray-700">PEST</label>
        <input
          type="text"
          name="pestle"
          value={filters.pestle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Source Filter */}
      <div>
        <label className="block text-gray-700">Source</label>
        <input
          type="text"
          name="source"
          value={filters.source}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* SWOT Filter */}
      <div>
        <label className="block text-gray-700">SWOT</label>
        <input
          type="text"
          name="swot"
          value={filters.swot}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Country Filter */}
      <div>
        <label className="block text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          value={filters.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* City Filter */}
      <div>
        <label className="block text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default Filter;
