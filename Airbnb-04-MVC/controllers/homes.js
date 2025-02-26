export const getAddHome = (req, res, next) => {
    res.render('addHome', {
        title: 'Add Home to Airbnb',
        currentPage: 'addHome'
    });
};

const registeredHomes = [];

export const postAddHome = (req, res, next) => {
    registeredHomes.push({
        houseName: req.body.houseName,
        price: req.body.price,
        rating: req.body.rating,
        location: req.body.location,
        houseImage: req.body.houseImage
    });

    res.render('homeAdded', { title: 'Home Added Successfull Page', currentPage: 'homeAdded' });
}

export const getHome = (req, res, next) => {
    res.render('home', { registeredHomes: registeredHomes, title: 'Airbnb Home', currentPage: 'Home' });
    console.log({ registeredHomes })
}