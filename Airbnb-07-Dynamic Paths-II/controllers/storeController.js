import Home from '../models/home.js';
import Favourite from '../models/favourite.js';
export const getHomes = (req, res, next) => {
    Home.fetchAll(registeredHomes =>
        res.render('store/home-list', {
            registeredHomes: registeredHomes,
            title: 'Airbnb Home',
            currentPage: 'home'
        })
    );
}
export const getIndex = (req, res, next) => {
    Home.fetchAll(registeredHomes =>
        res.render('store/index', {
            registeredHomes: registeredHomes,
            title: 'Homes List',
            currentPage: 'index'
        })
    );
}
export const getBookings = (req, res, next) => {
    res.render('store/bookings', {
        title: 'My Bookings',
        currentPage: 'bookings'
    })
}

export const getFavouriteList = (req, res, next) => {
    Favourite.getFavourites(favourites => {
        Home.fetchAll(registeredHomes => {
            const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id)) || [];
            console.log("Favourite Homes: ", favouriteHomes);
            res.render('store/favourite-list', {
                favouriteHomes: favouriteHomes,
                title: 'My Favourites',
                currentPage: 'favourites'
            });

        });

    });

}

export const getHomeDetail = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findHomeById(homeId, homeFound => {
        console.log("Home Found: ", homeFound);
        if (!homeFound) {
            console.log("Home not found");
            res.redirect('/homes');

        } else {
            res.render('store/home-detail', {
                home: homeFound,
                title: 'Home Detail',
                currentPage: 'home'
            });
        }

    });

}

export const postAddToFavouriteList = (req, res, next) => {
    const homeId = req.body.homeId;
    console.log(homeId);
    Favourite.addToFavourites(homeId, added => {
        if (added) {
            res.redirect('/favourite-list');
        } else {
            res.redirect('/homes');
        }
    });
}
export const postRemoveFromFavouriteList = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log(homeId);
    console.log("Removing from favourites", homeId);
    Favourite.removeFromFavourites(homeId, err => {
        if (err) {
            console.log("Error removing from favourites: ", err);
        }
        res.redirect('/favourite-list');

    });

}