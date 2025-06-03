import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
const db = client.db("nodejs-mongodb");
const userCollection = db.collection("users");
userCollection.insertOne(
    { name: "Aavash Dhami", age: 18 }
);