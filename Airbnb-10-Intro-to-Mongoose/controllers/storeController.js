import Home from '../models/home.js';
import Favourite from '../models/favourite.js';
export const getHomes = (req, res, next) => {
    Home.find()
        .then((registeredHomes) => {
            res.render('store/home-list', {
                registeredHomes: registeredHomes,
                title: 'Airbnb Home',
                currentPage: 'home'
            })
        })
}
export const getIndex = (req, res, next) => {
    Home.find()
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
Home.find()
        .then((registeredHomes) => {
            Favourite.find()
                .then((favouriteHomes) => {
                    favouriteHomes = favouriteHomes.map(favouriteHome => favouriteHome.homeId.toString());
                    registeredHomes = registeredHomes.filter(home => favouriteHomes.includes(home._id.toString()))
                    res.render('store/favourite-list', {
                        favouriteHomes: registeredHomes,
                        title: 'Favourite List',
                        currentPage: 'favourites'
                    })
                })
                .catch(err => {
                    console.log("Error getting favourites: ", err);
                })
        })
        .catch(err => {
            console.log(err)
        })

}

export const getHomeDetail = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findById(homeId)
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
    Favourite.findOne({ homeId: homeId })
        .then(result => {
            if (result) {
                console.log("Home already in favourites: ", result);
                return res.redirect('/favourite-list');
            }
            const favourite = new Favourite({ homeId: homeId });
            favourite.save()
                .then(result => {
                    console.log("Added to favourites: ", result);
                })
                .catch(err => {
                    console.log("Error adding to favourites: ", err);
                })
                .finally(() => {
                    res.redirect('/favourite-list');
                })
        })
        .catch(err => {
            console.log("Error checking favourites: ", err);
        })
}

export const postRemoveFromFavouriteList = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log(homeId);
    console.log("Removing from favourites", homeId);
    Favourite.findOneAndDelete({ homeId: homeId })
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