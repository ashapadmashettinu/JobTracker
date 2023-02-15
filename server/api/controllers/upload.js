import * as uploadService from "../services/upload.js";
import { errorSendHandler, sendSuccessResponse, sendNotFoundResponse, setSuccessResponse} from "../utils/setResponse.js";

/**
 * To upload the file
 * @param {*} request 
 * @param {*} response 
 */
export const uploadFile = async(request, response) => {
  try {
     await uploadService.upload(request, response);
     sendSuccessResponse({"message" : "Uploaded the file successfully", "fileName":request.file.filename}, response);
  } catch (err) {
      //checks if error due to file size.
    if (err.code == "LIMIT_FILE_SIZE") {
        errorSendHandler({message: "File size cannot be larger than 5MB!",}, response);
      }
    errorSendHandler({ message: `Could not upload the file: ${err}`,
      }, response)
  }
};

/**
 * To send the file to frontend by filename
 * @param {*} request 
 * @param {*} response 
 */
export const download = async (request, response) => {
  const fileName = request.params.name;
  const directoryPath = __basedir + "/static/assets/uploads/";

  await response.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
        errorSendHandler({
            message: "Could not download the file. " + err,
          }, response);
    }
  });
};