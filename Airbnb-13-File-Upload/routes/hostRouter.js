import { getAddHome, postAddHome, getHostHomes, getEditHome, postEditHome, postDeleteHome } from '../controllers/hostController.js';
import { createMultiFieldStorage } from '../utils/storage.js';
import express from 'express'
import path from 'path'


const hostRouter = express.Router();
const imageUploadPath = path.join(import.meta.dirname, '../public/images/uploads');
const rulesUploadPath = path.join(import.meta.dirname, '../public/images/rules');


const upload = createMultiFieldStorage({
    houseImage: { dest: imageUploadPath, mimes: ['image/jpg', 'image/jpeg', 'image/png'] },
    rulesPdf: { dest: rulesUploadPath, mimes: ['application/pdf'] }
});


hostRouter.get("/add-home", getAddHome)

hostRouter.post("/add-home", upload.fields([
    { name: 'houseImage', maxCount: 1 },
    { name: 'rulesPdf', maxCount: 1 }
]), postAddHome);
hostRouter.get("/host-home-list", getHostHomes)
hostRouter.get("/edit-home/:homeId", getEditHome)
hostRouter.post("/edit-home", upload.fields([
    { name: 'houseImage', maxCount: 1 },
    { name: 'rulesPdf', maxCount: 1 }
]), postEditHome)
hostRouter.post("/delete-home/:homeId", postDeleteHome)


export { hostRouter };