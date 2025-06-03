import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
const db = client.db("nodejs-mongodb");
const userCollection = db.collection("users");
userCollection.insertOne(
    { name: "Aavash Dhami", age: 18 }
);

//! insert many
userCollection.insertMany([
    { name: "Raju Mishra", age: 18 },
    { name: "Akkal Dhami", age: 18 }
]);

//! find
const allUsers = await userCollection.find().toArray();
console.log(allUsers);

//! find one
const user = await userCollection.findOne({ name: "Raju Mishra" });
console.log(user);
console.log(user._id.toHexString());

//! update one
await userCollection.updateOne(
    { name: "Aavash Dhami" },
    { $set: { age: 19 } }
);

//! update many
await userCollection.updateMany(
    { age: 18 },
    { $set: { age: 19 } }
);


//! delete one
await userCollection.deleteOne({ name: "Aavash Dhami", age: 19 });


// ! delete many
const result = await userCollection.deleteMany({ age: 19 });
console.log(`Deleted ${result.deletedCount} documents`);