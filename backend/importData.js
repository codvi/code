const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://localhost:27017';
const dbName = 'blackcoffer'; 
const collectionName = 'jsondata'; 
async function importData() {
    const client = new MongoClient(uri);

    try {
        await client.connect(); // Connect to the MongoDB server
        const database = client.db(dbName); // Access the existing database
        const collection = database.collection(collectionName); // Access the collection

        // Read the JSON file
        const jsonData = fs.readFileSync('C:/Users/upadh/Desktop/blackcoffer/jsondata.json'); // Use forward slashes
        const data = JSON.parse(jsonData); // Parse the JSON data

        // Insert data into the collection
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted`); // Output the number of inserted documents
    } catch (err) {
        console.error(err); // Log any errors
    } finally {
        await client.close(); // Close the connection
    }
}

importData(); // Call the function to execute the import
