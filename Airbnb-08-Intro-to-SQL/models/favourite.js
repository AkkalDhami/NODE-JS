import fs from 'fs';
import path from 'path';
import { rootDir } from '../utils/pathUtils.js';

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

export default class Favourite {
    static addToFavourites(homeId, callback) {
        Favourite.getFavourites(favourites => {
            if (!favourites.includes(homeId)) {
                favourites.push(homeId);
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (err) => {
                    console.log("Favourite added, ", err);
                    callback(!err);
                });
            } else {
                console.log("Home already in favourites");
                callback('Home already in favourites');
            }
        });
    }
    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });
        console.log("Favourites fetched...");
    }
    static removeFromFavourites(delHomeId, callback) {
        Favourite.getFavourites(homeIds => {
            console.log(homeIds, delHomeId);
            homeIds = homeIds.filter(homeId => homeId !== delHomeId);
            console.log(homeIds);
            fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
        });
    }


}