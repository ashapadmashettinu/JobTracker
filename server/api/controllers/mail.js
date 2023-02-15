import * as mailService from '../services/mail.js';
import { setSuccessResponse, errorHandler } from '../utils/setResponse.js';

export const sendMail = async(request, response) => {
    try {
        const mailObj = {...request.body };
        const mailRes = await mailService.sendMail(mailObj.from, mailObj.to, mailObj.subject, mailObj.body);
        console.log(mailRes);
        setSuccessResponse(mailRes, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}