import fetch from 'node-fetch';

const requestOptions = {
    method: 'GET',
    headers: {"X-CSCAPI-KEY": "bEFHTk02aHF2bnkxOG5ZTm80VXdWU05qaWQ2Y3NhWXZqOXE5MktzZQ=="},
    redirect: 'follow'
};

export const getCountries = async function(){
    const response = await fetch('https://api.countrystatecity.in/v1/countries/', requestOptions);
    return await response.json();
}

export const getStates = async function(country){
    const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states`, requestOptions);
    return await response.json();
}

export const getCities = async function(state, country){
    const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, requestOptions);
    return await response.json();
}

export const getCitiesByCountry = async function(country){
    const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/cities`, requestOptions);
    return await response.json();
}