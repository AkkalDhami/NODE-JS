
import { pool as db } from '../utils/databaseUtils.js';

export default class Favourite {
    constructor(homeId) {
        this.homeId = homeId;
    }
    static addToFavourites(homeId) {
        console.log("Adding to favourites: ", homeId);
        return db.execute('INSERT INTO favourites (homeId) VALUES (?)', [homeId]);
    }
    static getFavourites() {
        return db.execute('SELECT homeId FROM favourites');
    }
    static removeFromFavourites(delHomeId) {
        console.log("Removing from favourites: ", delHomeId);
        return db.execute('DELETE FROM favourites WHERE homeId = ?', [delHomeId]);
    }
}