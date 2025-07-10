import Home from '../models/home.js';
import { check, validationResult } from "express-validator";
import fs from 'fs'
import path from 'path';
import { deleteOldFile } from '../utils/deleteOldFile.js';

export const getAddHome = (req, res, next) => {
    res.render('host/edit-home', {
        isEditing: false,
        title: 'Add Home to Airbnb',
        currentPage: 'addHome',
        isLoggedIn: req.session.user ? true : false,
        user: req.session.user || {},
        errors: [],
        oldInput: {}
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
                user: req.session.user || {},
                errors: [],
                oldInput: {}
            });
        })
        .catch(err => {
            console.log("Error editing home: ", err);
        });

};

export const postAddHome = [
    check('houseName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('House name must be at least 2 characters long.'),

    check('description')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Description must be at least 2 characters long.'),

    check('location')
        .notEmpty()
        .withMessage('Location is required.')
        .trim(),

    check('price')
        .trim()
        .matches(/^[0-9]+$/)
        .withMessage('Price must be a number.'),

    check('markedPrice')
        .trim()
        .matches(/^[0-9]+$/)
        .withMessage('Marked price must be a number.'),

    // rating , 4.5
    check('rating')
        .trim()
        .matches(/^[0-9]+(\.[0-9]+)?$/)
        .withMessage('Rating must be a number.'),



    (req, res, next) => {
        const { houseName, price, markedPrice, rating, location, description } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors: ", errors.array());
            return res.status(422).render('host/edit-home', {
                errors: errors.array().map(error => error.msg),
                isEditing: false,
                title: 'Add Home to Airbnb',
                currentPage: 'addHome',
                isLoggedIn: req.session.user ? true : false,
                user: req.session.user || {},
                oldInput: { houseName, price, markedPrice, rating, location, description }
            });
        }

        if (!req.files) {
            console.log("No file uploaded");
            return res.status(402).send('No image uploaded');
        }

        const houseImage = req.files['houseImage'] ? req.files['houseImage'][0].filename : null;
        const rulesPdf = req.files['rulesPdf'] ? req.files['rulesPdf'][0].filename : null;
        const home = new Home({ houseName, price, markedPrice, rating, location, houseImage, rulesPdf, description });
        home.save()
            .then(result => {
                console.log("Home saved: ", result);
                console.log("Home saved")
            })
            .catch(err => {
                console.log("Error adding home: ", err);
            })
            .finally(() => {
                res.redirect('/host/host-home-list');
            })
    }
]

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

    const { id, houseName, price, markedPrice, rating, location, description } = req.body;

    Home.findById(id)
        .then(home => {
            if (!home) {
                console.log("Home not found for editing:", id);
                return res.redirect('/host/host-home-list');
            }
            home.houseName = houseName;
            home.price = price;
            home.markedPrice = markedPrice;
            home.rating = rating;
            home.location = location;
            home.description = description;

            // Update image if new file uploaded
            if (req.files && req.files['houseImage'] && req.files['houseImage'][0]) {
                const oldImage = home.houseImage;
                if (oldImage) {
                    const filePath = path.join(import.meta.dirname, '../public/images/uploads', oldImage);
                    deleteOldFile(filePath);
                }
                home.houseImage = req.files['houseImage'][0].filename;
            }

            

            // Update rules PDF if new file uploaded
            if (req.files && req.files['rulesPdf'] && req.files['rulesPdf'][0]) {
                const oldPdf = home.rulesPdf;
                if (oldPdf) {
                    const pdfPath = path.join(import.meta.dirname, '../public/images/rules', oldPdf);
                    deleteOldFile(pdfPath);
                }
                home.rulesPdf = req.files['rulesPdf'][0].filename;
            }

            return home.save();
        })
        .then(() => {
            res.redirect('/host/host-home-list');
        })
        .catch(err => {
            console.log("Error updating home: ", err);
            res.redirect('/host/host-home-list');
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