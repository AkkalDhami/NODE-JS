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
    Home.findHomeById(homeId)
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
                currentPage: 'host-homes'
            });
        })
        .catch(err => {
            console.log("Error editing home: ", err);
        });

};


export const postAddHome = (req, res, next) => {
    const { houseName, price, rating, location, houseImage, description } = req.body;
    const home = new Home(houseName, price, rating, location, houseImage, description);
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
    Home.deleteHomeById(homeId)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log("Error deleting home: ", err);
        })
        .finally(() => {
            res.redirect('/host/host-home-list');
        })
}

export const postEditHome = (req, res, next) => {
    const { houseName, price, rating, location, houseImage, description, id } = req.body;
    console.log(req.body)
    const home = new Home(houseName, price, rating, location, houseImage, description, id);
    home.save()
        .then(result => {
            console.log("Home edited: ", result);
        })
        .catch(err => {
            console.log("Error editing home: ", err);
        })
        .finally(() => {
            res.redirect('/host/host-home-list');
        })
}

export const getHostHomes = (req, res, next) => {
    Home.fetchAll()
        .then((registeredHomes) => {
            console.log("Registered Homes: ", registeredHomes);
            res.render('host/host-home-list', {
                registeredHomes: registeredHomes,
                title: 'Host Homes List',
                currentPage: 'host-homes'
            })
        });
}