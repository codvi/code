// controllers/dataController.js
const Data = require('../Models/dataSchema'); // Assuming your MongoDB model is called 'Data'

// Fetch all data
exports.getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};

// Fetch data with filters (year, topic, etc.)
exports.getFilteredData = async (req, res) => {
  const { end_year, topic, sector, region, pestle, source, country, city,relevance, intensity } = req.query;

  const query = {};
  console.log(req.query);
  // Dynamically add filters if present
  if (end_year) query.end_year = end_year;
  if (topic) query.topic = topic;
  if (sector) query.sector = sector;
  if (region) query.region = region;
  if (pestle) query.pestle = pestle;
  if (source) query.source = source;
  if (country) query.country = country;
  if (city) query.city = city;
  if(relevance) query.relevance = relevance;
  if(intensity) query.intensity = intensity;

  try {
    const filteredData = await Data.find(query);
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered data', error });
  }
};
