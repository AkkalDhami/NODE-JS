import Home from '../models/home.js';

export const getAddHome = (req, res, next) => {
    res.render('host/edit-home', {
        isEditing: false,
        title: 'Add Home to Airbnb',
        currentPage: 'addHome'
    });
};

export const getEditHome = (req, res, next) => {
    let homeId = req.params.homeId;
    const isEditing = req.query.editing === 'true';
    Home.findHomeById(homeId, home => {
        if (!home) {
            console.log("Home not found for editing");
            return res.redirect('/host-home-list');
        }
        console.log(home);
        res.render('host/edit-home', {
            home: home,
            isEditing: isEditing,
            title: 'Edit Your Home',
            currentPage: 'host-homes'
        });
    });
};


export const postAddHome = (req, res, next) => {
    const { houseName, price, rating, location, houseImage } = req.body;
    const home = new Home(houseName, price, rating, location, houseImage);
    home.save();
    res.redirect('/host/host-home-list');
}
export const postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Deleting home with id: ", homeId);
    Home.deleteHomeById(homeId, err => {
        if (err) {
            console.log("Error deleting home: ", err);
        }
        res.redirect('/host/host-home-list');
    });
}
export const postEditHome = (req, res, next) => {
    const { homeId, houseName, price, rating, location, houseImage } = req.body;
    console.log(req.body)
    const home = new Home(houseName, price, rating, location, houseImage);
    home.id = homeId;
    home.save();
    res.redirect('/host/host-home-list');
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