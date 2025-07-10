import Home from '../models/home.js';
import User from '../models/user.js';
import path from 'path';
export const getHomes = (req, res, next) => {
    Home.find()
        .then((registeredHomes) => {
            res.render('store/home-list', {
                registeredHomes: registeredHomes,
                title: 'Airbnb Home',
                currentPage: 'home',
                isLoggedIn: req.session.user ? true : false,
                user: req.session.user || {}
            })
        })
}
export const getIndex = (req, res, next) => {
    console.log("session: ", req.session);
    Home.find()
        .then((registeredHomes) => {
            res.render('store/index', {
                registeredHomes: registeredHomes,
                title: 'Airbnb Home',
                currentPage: 'index',
                isLoggedIn: req.session.user ? true : false,
                user: req.session.user || {}
            })
        })
}

export const getBookings = (req, res, next) => {
    res.render('store/bookings', {
        title: 'My Bookings',
        currentPage: 'bookings',
        isLoggedIn: req.session.user ? true : false,
        user: req.session.user || {}
    })
}

export const getFavouriteList = async (req, res, next) => {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favorites')

    res.render('store/favourite-list', {
        favorites: user.favorites,
        title: 'Favourite List',
        currentPage: 'favorite-list',
        isLoggedIn: req.session.user ? true : false,
        user: req.session.user || {}
    });

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
                    currentPage: 'home',
                    isLoggedIn: req.session.user ? true : false,
                    user: req.session.user || {}
                });
            }
        })

}

export const postAddToFavouriteList = async (req, res, next) => {
    const homeId = req.body.homeId;
    if (!req.session.isLoggedIn || !req.session.user) {
        console.log("User not logged in, redirecting to login page");
        return res.redirect('/auth/login');
    }

    const userId = req.session.user._id;
    if (!userId) {
        console.log("User ID not found in session");
        return res.redirect('/auth/login');
    }
    const user = await User.findById(userId).populate('favorites');

    const isAlreadyFavourite = user.favorites.some(fav => fav._id.toString() === homeId);

    if (isAlreadyFavourite) {
        console.log("Home already in favourites");
        return res.redirect('/favourite-list');
    }


    console.log("Adding to favourites", homeId);
    user.favorites.push(homeId);
    await user.save();
    res.redirect('/favourite-list');

}

export const postRemoveFromFavouriteList = async (req, res, next) => {
    const homeId = req.params.homeId;
    console.log(homeId);
    console.log("Removing from favourites", homeId);

    if (!req.session.isLoggedIn || !req.session.user) {
        console.log("User not logged in, redirecting to login page");
        return res.redirect('/auth/login');
    }

    const userId = req.session.user._id;
    if (!userId) {
        console.log("User ID not found in session");
        return res.redirect('/auth/login');

    }

    const user = await User.findById(userId).populate('favorites');
    const isAlreadyFavourite = user.favorites.some(fav => fav._id.toString() === homeId);
    if (!isAlreadyFavourite) {
        console.log("Home not in favourites");
        return res.redirect('/favourite-list');
    }

    user.favorites = user.favorites.filter(fav => fav._id.toString() !== homeId);
    await user.save();
    res.redirect('/favourite-list');
}

export const getHomeRules = [(req, res, next) => {
    if (!req.session.isLoggedIn || !req.session.user) {
        console.log("User not logged in, redirecting to login page");
        return res.redirect('/auth/login');
    }
    next();
}, async (req, res, next) => {
    const homeId = req.params.homeId;
    console.log(homeId);

    const home = await Home.findById({ _id: homeId });
    if (!home) {
        console.log("Home not found");
        return res.redirect('/home-detail/' + homeId);
    }
    const filePath = path.join(import.meta.dirname, '../public/images/rules', home.rulesPdf);

    res.download(filePath, home.rulesPdf, (err) => {
        if (err) {
            console.log("Error downloading file:", err);
            return res.redirect('/home-detail/' + homeId);
        }
    });
}]