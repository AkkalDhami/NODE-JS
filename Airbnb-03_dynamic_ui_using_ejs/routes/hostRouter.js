
import express from 'express'
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome', {title: 'Add Home Page'});

})
const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  registeredHomes.push({
    houseName: req.body.houseName,
  });
  console.log('Home Registration successful for:', req.body.houseName);
  res.render('homeAdded', {title: 'Home Added Successfull Page'});
})


console.log(registeredHomes);
export { hostRouter, registeredHomes };
