
import express from 'express'
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render('addHome');
  console.log("homes2: ", registeredHomes)

})

hostRouter.post("/add-home", (req, res, next) => {
  console.log('Home Registration successful for:', req.body.houseName);
  res.render('homeAdded');
})

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  registeredHomes.push(req.body.houseName);
  console.log("homes3: ", registeredHomes, req.body.houseName)
  res.render('homeAdded');
})

console.log(registeredHomes);
export { hostRouter, registeredHomes };
