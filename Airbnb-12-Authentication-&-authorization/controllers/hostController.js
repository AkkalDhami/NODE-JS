import Home from '../models/home.js';

export const getAddHome = (req, res, next) => {
    res.render('host/edit-home', {
        isEditing: false,
        title: 'Add Home to Airbnb',
        currentPage: 'addHome',
        isLoggedIn: req.session.user ? true : false,
        user: req.session.user || {}
    });
};

export const getEditHome = (req, res, next) => {
    let homeId = req.params.homeId;
    const isEditing = req.query.editing === 'true';
    Home.findById(homeId)
        .then((home) => {
            if (!home) {
                console.log("Home not found for editing");
                return res.redirect('/host-home-list');
            }
            console.log("Home found for editing: ", home);
            res.render('host/edit-home', {
                home: home,
                isEditing: isEditing,
                title: 'Edit Your Home',
                currentPage: 'host-homes',
                isLoggedIn: req.session.user ? true : false,
                user: req.session.user || {}
            });
        })
        .catch(err => {
            console.log("Error editing home: ", err);
        });

};

export const postAddHome = (req, res, next) => {
    const { houseName, price, markedPrice, rating, location, houseImage, description } = req.body;
    const home = new Home({ houseName, price, markedPrice, rating, location, houseImage, description });
    home.save()
        .then(result => {
            console.log("Home saved")
        })
        .catch(err => {
            console.log("Error adding home: ", err);
        })
        .finally(() => {
            res.redirect('/host/host-home-list');
        })
}

export const postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Deleting home with id: ", homeId);
    Home.findByIdAndDelete(homeId)
        .then(result => {
            console.log("Home deleted: ", result);
        })
        .catch(err => {
            console.log("Error deleting home: ", err);
        })
        .finally(() => {
            res.redirect('/host/host-home-list');

        })
}

export const postEditHome = (req, res, next) => {
    const { id, houseName, price, markedPrice, rating, location, houseImage, description } = req.body;
    console.log("Editing home : ", req.body);
    Home.findById(id)
        .then(home => {
            if (!home) {
                console.log("Home not found for editing:", id);
                return res.redirect('/host-home-list');
            }
            home.houseName = houseName;
            home.price = price;
            home.markedPrice = markedPrice;
            home.rating = rating;
            home.location = location;
            home.houseImage = houseImage;
            home.description = description;
            return home.save();
        })
        .catch(err => {
            console.log("Error updating home: ", err);
        })
        .finally(() => {
            res.redirect('/host/host-home-list');
        })

        .catch(err => {
            console.log("Error editing home: ", err);
        });
}

export const getHostHomes = (req, res, next) => {
    Home.find()
        .then((registeredHomes) => {
            console.log("Registered Homes: ", registeredHomes);
            res.render('host/host-home-list', {
                registeredHomes: registeredHomes,
                title: 'Host Homes List',
                currentPage: 'host-homes',
                isLoggedIn: req.session.user ? true : false,
                user: req.session.user || {}
            })
        });
}