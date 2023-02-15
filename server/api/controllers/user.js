import * as userService from "../services/user.js";
import Users from "../models/user.js";
import {
  setSuccessResponse,
  errorHandler,
  setNotFoundStatus,
} from "../utils/setResponse.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtTokenExpiry = "10h";

/**
 *
 * @param {*} request
 * @param {*} response
 */
export const create = async (request, response) => {
  try {
    const userObj = { ...request.body };
    const username = userObj.username;

    const userinDB = await userService.findOne({ username});
    if (userinDB) {
      setNotFoundStatus({ username: "Username already exists" }, response);
    } 
    else {
      //bcrypt is used for hashing the password.
      userObj.password = await bcrypt.hash(userObj.password, 10);
      const newUser = await userService.create(userObj);
      const token = Jwt.sign({newUser},
        process.env.TOKEN_KEY,
        {
          expiresIn: jwtTokenExpiry,
        }
      );
      // save user token

      //newUser.token = token;
      setSuccessResponse({token}, response);

    }
  } catch (e) {
    errorHandler(e.message, response);
  }
};

export const login = async (request, response) => {
  try {

   /* User Authentication Working
    const user = {...request.body };
    const users = await userService.search(user);
    console.log(users.length);
    if (users.length === 1) // if the user is not present
    {
      setSuccessResponse(users[0], response);
     
    }
    else{ // if the user is present
      setNotFoundStatus("UserName Not Found",response);
    } /*
   
    /*
    const userName = request.body.userName;
    const password = request.body.password;
    Users.findOne({ userName }).then((user) => {
      //check if user exists
      if (!user) {
          console.log("Username not found")
        setNotFoundStatus({usernamenotfound: "Username not found" },response ) 
      }
       */ 

    const { username, password } = request.body;
    const users = await userService.findOne({ username });

    if (users) {
      const currentUser = users;
      // if the user is exists
      if (await bcrypt.compare(password, currentUser.password)) {
        // Create token
        const token = Jwt.sign({currentUser},
          process.env.TOKEN_KEY,
          {
            expiresIn: jwtTokenExpiry,
          }
        );
        // save user token
        currentUser.token = token;
        setSuccessResponse({token}, response);
      } else {
        // if the user is present
        setNotFoundStatus("Invalid Credentials", response);
      }
    }
  } catch (e) {
    errorHandler(e.message, response);
  }
};

export const search = async (request, response) => {
  try {
    const users = await userService.search();
    setSuccessResponse(users, response);
  } catch (e) {
    errorHandler(e.message, response);
  }
};

export const findById = async (request, response) => {
  try {
    const id = request.params.id;
    const users = await userService.findById(id);
    setSuccessResponse(users, response);
  } catch (e) {
    errorHandler(e.message, response);
  }
};

export const deleteById = async (request, response) => {
  try {
    const id = request.params.id;
    const user = await userService.deleteById(id);
    setSuccessResponse(user, response);
  } catch (e) {
    errorHandler(e.message, response);
  }
};

export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const user = { ...request.body, id };

    const updatedUser = await userService.update(user);
    setSuccessResponse(updatedUser, response);
  } catch (e) {
    errorHandler(e, response);
  }
};
