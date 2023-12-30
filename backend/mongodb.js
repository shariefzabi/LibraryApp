// db.js
const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
    try {
        const uri = 'mongodb+srv://shariff:zabiShariff@cluster0.pfkv2.mongodb.net/Library'; // Replace with your MongoDB URI and database name
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not initialized!');
    }
    return db;
}

module.exports = {
    connectDB,
    getDB,
};

