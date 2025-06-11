
import { pool as db } from '../utils/databaseUtils.js';

export default class Home {
    constructor(houseName, price, rating, location, houseImage, description, id) {
        this.houseName = houseName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.houseImage = houseImage;
        this.description = description;
        this.id = id;
    }
    save() {
        if (this.id) {
            return db.execute(
                'UPDATE airbnb SET house_name = ?, price = ?, description = ?, location = ?, house_img = ?, rating = ? WHERE id = ?',
                [
                    this.houseName,
                    parseFloat(this.price),
                    this.description,
                    this.location,
                    this.houseImage,
                    parseFloat(this.rating),
                    this.id
                ]
            );

        } else {
            return db.execute(
                'INSERT INTO airbnb (house_name, price, description, location, house_img, rating) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    this.houseName,
                    parseFloat(this.price),
                    this.description,
                    this.location,
                    this.houseImage,
                    parseFloat(this.rating)
                ]
            );
        }

    }

    static fetchAll() {
        return db.execute('SELECT * FROM airbnb');
    }
    static findHomeById(homeId) {
        return db.execute('SELECT * FROM airbnb WHERE id = ?', [homeId]);
    }
    static deleteHomeById(homeId) {
        return db.execute('DELETE FROM airbnb WHERE id = ?', [homeId]);
    }
}