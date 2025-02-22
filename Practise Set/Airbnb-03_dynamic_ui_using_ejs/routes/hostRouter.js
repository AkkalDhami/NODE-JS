
import express from 'express'
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome', {title: 'Add Home Page',currentPage: 'addHome'});

})
const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  registeredHomes.push({
    houseName: req.body.houseName,
    price: req.body.price,
    rating: req.body.rating,
    location: req.body.location,
    houseImage: req.body.houseImage
  });
  console.log('Home Registration successful for:', req.body.houseName);
  res.render('homeAdded', {title: 'Home Added Successfull Page',currentPage: 'homeAdded'});
})


console.log(registeredHomes);
export { hostRouter, registeredHomes };
