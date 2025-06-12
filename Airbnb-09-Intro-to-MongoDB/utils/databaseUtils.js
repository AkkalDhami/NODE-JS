import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
let MONGO_URI = "mongodb+srv://akkal12:aAsSdDfFgG@learnmongodb.achrmde.mongodb.net/?retryWrites=true&w=majority&appName=LEARNMONGODB";

let _db;

export const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URI)
        .then(client => {
            callback();
            _db = client.db("airbnb");
            console.log("Connected to database!")
            return client;
        })
        .catch(err => console.log("Error connecting to database: ", err));
}

export const getDb = () => _db;