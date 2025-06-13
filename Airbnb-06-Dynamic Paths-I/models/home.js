import fs from 'fs';
import path from 'path';
import { rootDir } from '../utils/pathUtils.js';
import { register } from 'module';

const homeDataPath = path.join(rootDir, "data", "homes.json");

export default class Home {
    constructor(houseName, price, rating, location, houseImage) {
        this.houseName = houseName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.houseImage = houseImage;
    }
    save() {
        this.id = Date.now().toString();
        Home.fetchAll(registeredHomes => {
            registeredHomes.push(this);
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => console.log(err));
        })
    }
    static fetchAll(callback) {
        fs.readFile(homeDataPath, (err, data) => {
            console.log("File readed , ", err);
            callback(!err ? JSON.parse(data) : []);
        });
    }
    static findHomeById(homeId, callback) {
        this.fetchAll(registeredHomes => {
            const homeFound = registeredHomes.find(h => h.id === homeId);
            callback(homeFound);
        })
    }
}