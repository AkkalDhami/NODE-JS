import Home from '../models/home.js';

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
     Home.fetchAll(registeredHomes =>
        res.render('store/favourite-list', {
            title: 'My Favourites',
            currentPage: 'favourites'
        })
    );

}