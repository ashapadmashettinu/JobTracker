import express from "express";
import * as locationController from '../controllers/location.js';

/**
 * contains the routes for user create, search, search delete and update by id
 */
const router = express.Router();

router.route('/countries')
    .get(locationController.getCountries);

router.route('/states/:countryid')
    .get(locationController.getStates);

router.route('/cities/:stateid/:countryid')
    .get(locationController.getCities);

router.route('/cities/:countryid')
    .get(locationController.getCitiesByCountry);


export default router;