import Home from '../models/home.js';
import Favourite from '../models/favourite.js';
export const getHomes = (req, res, next) => {
    Home.fetchAll()
        .then((registeredHomes) => {
            res.render('store/home-list', {
                registeredHomes: registeredHomes,
                title: 'Airbnb Home',
                currentPage: 'home'
            })
        })
}
export const getIndex = (req, res, next) => {
    Home.fetchAll()
        .then((registeredHomes) => {
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
        .then((favourites) => {
            const favouriteIds = favourites.map(favourite => favourite.homeId);
            Home.fetchAll()
                .then((registeredHomes) => {
                    const favouriteHomes = registeredHomes.filter(home => favouriteIds.includes(home._id.toString()));
                    res.render('store/favourite-list', {
                        favouriteHomes: favouriteHomes,
                        title: 'Favourite List',
                        currentPage: 'favourite-list'
                    })
                })
        })
        .catch(err => {
            console.log("Error getting favourites: ", err);
        })



}

export const getHomeDetail = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findHomeById(homeId)
        .then((home) => {
            console.log("Home Found: ", home);
            if (!home) {
                console.log("Home not found");
                res.redirect('/homes');
            } else {
                res.render('store/home-detail', {
                    home: home,
                    title: 'Home Detail',
                    currentPage: 'home'
                });
            }
        })

}

export const postAddToFavouriteList = (req, res, next) => {
    const homeId = req.body.homeId;
    const favHome = new Favourite(homeId);
    favHome.save()
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
    Favourite.deleteById(homeId)
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