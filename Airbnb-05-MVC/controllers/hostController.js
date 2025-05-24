import Home from '../models/home.js';

export const getAddHome = (req, res, next) => {
    res.render('host/add-home', {
        title: 'Add Home to Airbnb',
        currentPage: 'addHome'
    });
};


export const postAddHome = (req, res, next) => {
    const { houseName, price, rating, location, houseImage } = req.body;
    const home = new Home(houseName, price, rating, location, houseImage);
    home.save();

    res.render('host/home-added', {
        title: 'Home Added Successfull Page',
        currentPage: 'homeAdded'
    });
}

export const getHostHomes = (req, res, next) => {
    Home.fetchAll(registeredHomes =>
        res.render('host/host-home-list', {
            registeredHomes: registeredHomes,
            title: 'Host Homes List',
            currentPage: 'host-homes'
        })
    );
}