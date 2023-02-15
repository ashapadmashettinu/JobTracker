const successStatusCode = 200;
const errorStatusCode = 500;
const notFoundStatusCode = 404;
/**
 * 
 * @param {*} data 
 * @param {*} response 
 */
 export const setSuccessResponse = (data, response) => {
    response.status(successStatusCode);
    response.json(data);
}

export const setNotFoundStatus = (data, response) => {
    response.status(notFoundStatusCode);
    response.json(data);
}

/**
 * 
 * @param {*} message 
 * @param {*} response 
 */
 export const errorHandler = (message, response) => {
    response.status(errorStatusCode);
    response.json({ error: message });
}

/**
 * 
 * @param {*} data 
 * @param {*} response 
 */
 export const sendNotFoundResponse = (data, response) => {
    response.status(notFoundStatusCode);
    response.send(data);
}

/**
 * 
 * @param {*} data 
 * @param {*} response 
 */
 export const sendSuccessResponse = (data, response) => {
    response.status(successStatusCode);
    response.send(data);
}


/**
 * 
 * @param {*} message 
 * @param {*} response 
 */
 export const errorSendHandler = (message, response) => {
    response.status(errorStatusCode);
    response.send({ error: message });

 }