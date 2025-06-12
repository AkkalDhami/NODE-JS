import { getDb } from '../utils/databaseUtils.js';
export default class Favourite {
    constructor(homeId) {
        this.homeId = homeId
    }

    save() {
        const db = getDb();
        return db.collection('favourites').findOne({ homeId: this.homeId }).then(result => {
            if (!result) {
                return db.collection('favourites').insertOne(this);
            }
            else {
                return Promise.resolve();
            }
        }).catch(err => {
            console.log("Error adding to favourites: ", err);
        });
    }
    static getFavourites() {
        const db = getDb();
        return db.collection('favourites').find().toArray();
    }
    static deleteById(homeId) {
        const db = getDb();
        return db.collection('favourites').deleteOne({ homeId });
    }
}