import fs from 'fs';
import path from 'path';
import { rootDir } from '../utils/pathUtils.js';


export default class Home {
    constructor(houseName, price, rating, location, houseImage) {
        this.houseName = houseName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.houseImage = houseImage;
    }
    save() {
        Home.fetchAll(registeredHomes => {
            registeredHomes.push(this);
            const homeDataPath = path.join(rootDir, "data", "homes.json");
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => console.log(err));
        })
    }
    static fetchAll(callback) {
        const homeDataPath = path.join(rootDir, "data", "homes.json");
        fs.readFile(homeDataPath, (err, data) => {
            console.log("File readed , ",err);
            callback(!err ? JSON.parse(data) : []);
        });
    }
}