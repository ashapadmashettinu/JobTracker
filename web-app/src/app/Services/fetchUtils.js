//Function to keep common implementation for all fetch calls from the components
import { BASE_URL } from "../Constants/config";

export async function fetchGetApi(url) {
    const toJson = (response) => response.json();
    const apiUri = BASE_URL + url;
    return await fetch(apiUri).then(toJson);
}

export async function fetchPostApi(url, body = {}) {
    const toJson = (response) => response.json()
    const options = {
        method: "POST", // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(body)
    }
    const apiUri = BASE_URL + url;
    return fetch(apiUri, options).then(toJson);
}

export async function fetchPostFileApi(url, formData = {}){
    const toJson = (response) => response.json();
    const options = {
        method: "POST", // Method itself
        headers:{
            'Access-Control-Allow-Origin': '*'
        },
        body: formData,
    }
    const apiUri = BASE_URL + url;
    return fetch(apiUri, options).then(toJson);
}

export async function fetchPutApi(url, body = {}){
    const toJson = (response) => response.json();
    const options = {
        method: "PUT", // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(body)
    }
    const apiUri = BASE_URL + url;
    return fetch(apiUri, options).then(toJson);
}

export async function fetchDeleteApi(url) {
    const toJson = (response) => response.json();
    const options = {
        method: "DELETE", // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        }
    }
    const apiUri = BASE_URL + url;
    return fetch(apiUri, options).then(toJson);
}