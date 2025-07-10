import express from 'express'

import { getHomes, getBookings, getIndex, getFavouriteList, getHomeDetail, postAddToFavouriteList, postRemoveFromFavouriteList, getHomeRules } from '../controllers/storeController.js';

const storeRouter = express.Router();

storeRouter.get("/homes", getHomes);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/", getIndex);
storeRouter.get("/favourite-list", getFavouriteList);
storeRouter.get("/rules/:homeId", getHomeRules);

storeRouter.get("/home-detail/:homeId", getHomeDetail);
storeRouter.post("/favourite-list", postAddToFavouriteList);
storeRouter.post("/remove-favourite/:homeId", postRemoveFromFavouriteList);

export { storeRouter };