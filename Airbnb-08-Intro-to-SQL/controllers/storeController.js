import Home from '../models/home.js';
import Favourite from '../models/favourite.js';
export const getHomes = (req, res, next) => {
    Home.fetchAll()
        .then(([registeredHomes]) => {
            res.render('store/home-list', {
                registeredHomes: registeredHomes,
                title: 'Airbnb Home',
                currentPage: 'home'
            })
        })
}
export const getIndex = (req, res, next) => {
    Home.fetchAll()
        .then(([registeredHomes]) => {
            console.log('Registered Homes12: ', registeredHomes);
            res.render('store/index', {
                registeredHomes: registeredHomes,
                title: 'Airbnb Home',
                currentPage: 'index'
            })
        })
}
export const getBookings = (req, res, next) => {
    res.render('store/bookings', {
        title: 'My Bookings',
        currentPage: 'bookings'
    })
}

export const getFavouriteList = (req, res, next) => {
    Favourite.getFavourites()
        .then(([favourites]) => {
            console.log("Favourites IDs: ", favourites);
            Home.fetchAll()
                .then(([registeredHomes]) => {
                    console.log("Registered Homes: ", registeredHomes);
                    registeredHomes = registeredHomes.filter(home => favourites.some(favourite => favourite.homeId === home.id));
                    console.log("Registered Homes: ", registeredHomes);

                    res.render('store/favourite-list', {
                        favouriteHomes: registeredHomes,
                        favourites: favourites,
                        title: 'Favourite List',
                        currentPage: 'favourite'
                    })
                })
        })
}

export const getHomeDetail = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findHomeById(homeId)
        .then(([home]) => {
            console.log("Home Found: ", home);
            if (!home) {
                console.log("Home not found");
                res.redirect('/homes');
            } else {
                res.render('store/home-detail', {
                    home: home[0],
                    title: 'Home Detail',
                    currentPage: 'home'
                });
            }
        })

}

export const postAddToFavouriteList = (req, res, next) => {
    const homeId = req.body.homeId;
    console.log(homeId);
    Favourite.addToFavourites(homeId)
        .then(result => {
            console.log("Added to favourites: ", result);
        })
        .catch(err => {
            console.log("Error adding to favourites: ", err);
        })
        .finally(() => {
            res.redirect('/favourite-list');
        })
}
export const postRemoveFromFavouriteList = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log(homeId);
    console.log("Removing from favourites", homeId);
    Favourite.removeFromFavourites(homeId)
        .then(result => {
            console.log("Removed from favourites: ", result);
        })
        .catch(err => {
            console.log("Error removing from favourites: ", err);
        })
        .finally(() => {
            res.redirect('/favourite-list');
        })

}