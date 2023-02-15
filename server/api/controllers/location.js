import * as locationService from '../services/location.js'
const successStatusCode = 200;
const errorStatusCode = 500;

/**
 * 
 * @param {*} data 
 * @param {*} response 
 */
const setSuccessResponse = (data, response) => {
    response.status(successStatusCode);
    response.json(data);
}

/**
 * 
 * @param {*} message 
 * @param {*} response 
 */
const errorHandler = (message, response) => {
    response.status(errorStatusCode);
    response.json({ error: message });
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const getCountries = async(request, response) => {
    try {
        const countries = await locationService.getCountries();
        setSuccessResponse(countries, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const getStates = async(request, response) => {
    try {
        const countryid = request.params.countryid;
        const states = await locationService.getStates(countryid);
        setSuccessResponse(states, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const getCities = async(request, response) => {
    try {
        const countryid = request.params.countryid;
        const stateid = request.params.stateid;
        const cities = await locationService.getCities(stateid,countryid);
        setSuccessResponse(cities, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const getCitiesByCountry = async(request, response) => {
    try {
        const countryid = request.params.countryid;
        const cities = await locationService.getCitiesByCountry(countryid);
        setSuccessResponse(cities, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}