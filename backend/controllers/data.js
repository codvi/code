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

// Fetch data with filters (year, topic, etc.) and aggregate by sector
exports.getFilteredData = async (req, res) => {
  const { end_year, topic, sector, region, pestle, source, country, city, relevance, intensity } = req.query;

  const matchQuery = {};
  console.log(req.query);
  // Dynamically add filters if present
  if (end_year) matchQuery.end_year = end_year;
  if (topic) matchQuery.topic = topic;
  if (sector) matchQuery.sector = sector;
  if (region) matchQuery.region = region;
  if (pestle) matchQuery.pestle = pestle;
  if (source) matchQuery.source = source;
  if (country) matchQuery.country = country;
  if (city) matchQuery.city = city;
  if (relevance) matchQuery.relevance = relevance;
  if (intensity) matchQuery.intensity = intensity;

  try {
    const filteredData = await Data.aggregate([
      { $match: matchQuery }, // Match based on provided filters
      {
        $group: {
          _id: "$sector", // Group by sector
          totalIntensity: { $sum: "$intensity" }, // Aggregate intensity
          count: { $sum: 1 }, // Count number of documents in each group
          // Add other fields if needed
        },
      },
    ]);

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered data', error });
  }
};
