import { ObjectId } from 'mongodb';
import { getDb } from '../utils/databaseUtils.js';

export default class Home {
    constructor(houseName, price, rating, location, houseImage, description, _id) {
        this.houseName = houseName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.houseImage = houseImage;
        this.description = description;
        if (_id) {
            this._id = _id
        }
    }
    save() {
        const db = getDb();
        if (this._id) {
            console.log("Updating home: ", this);
            return db.collection('homes').updateOne(
                {
                    _id: new ObjectId(String(this._id))
                },
                {
                    $set: {
                        houseName: this.houseName,
                        price: this.price,
                        rating: this.rating,
                        location: this.location,
                        houseImage: this.houseImage,
                        description: this.description
                    }
                });
        } else {
            return db.collection('homes').insertOne(this);
        }
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('homes').find().toArray();
    }

    static findHomeById(homeId) {
        console.log("Finding home by id: ", homeId);
        const db = getDb();
        return db.collection('homes').find({ _id: new ObjectId(String(homeId)) }).next();
    }

    static deleteHomeById(homeId) {
        const db = getDb();
        return db.collection('homes').deleteOne({ _id: new ObjectId(String(homeId)) });
    }
}