const mongoose = require('mongoose');

const dbURI = "mongodb+srv://vipransh:vipr123@cluster0.xlbuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI, {})
.then(() => {
    console.log("My DB is Connected");
})
.catch((error) => {
    console.log("Some error occurred", error);
});

module.exports = mongoose;
