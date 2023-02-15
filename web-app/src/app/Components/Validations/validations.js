//Function to keep common implementation for all validation calls from the components
//const { check } = require("express-validator");

// export async function nameValidation(fieldName, fieldValue) {
//     if (fieldValue.trim() === '') {
//         return `${fieldName} is required`;
//     }
//     if (/[^a-zA-Z -]/.test(fieldValue)) {
//         return 'Invalid characters';
//     }
//     if (fieldValue.trim().length < 3) {
//         return `${fieldName} needs to be at least three characters`;
//     }
//     return null;
// };

// export async function emailValidation(email) {
//     if (
//         /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
//             email,
//         )
//     ) {
//         return null;
//     }
//     if (email.trim() === '') {
//         return 'Email is required';
//     }
//     return 'Please enter a valid email';
// };

// module.exports = {

//     validateEmail: check('email')

//     // To delete leading and triling space
//         .trim()

//     // Normalizing the email address
//         .normalizeEmail()

//     // Checking if follow the email
//     // address formet or not
//         .isEmail()

//     // Custom message
//         .withMessage('Invalid email')

//     // Custom validation
//     // Validate email in use or not
//         .custom(async(email) => {
//         const existingUser =
//             await repo.getOneBy({ email })

//         if (existingUser) {
//             throw new Error('Email already in use')
//         }
//     })
// }

const validations = (values) => {
    let errors = {};
    if (!values.firstName) {
        errors.firstName = "First Name is required";
    }
    return "";
};