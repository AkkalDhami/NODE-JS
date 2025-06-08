import express from 'express'

import { getHomes, getBookings, getIndex, getFavouriteList } from '../controllers/storeController.js';

const storeRouter = express.Router();

storeRouter.get("/homes", getHomes);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/", getIndex);
storeRouter.get("/favourite-list", getFavouriteList);

export { storeRouter };