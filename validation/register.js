const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Name Checks
    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name is required";
    }
    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name is required";
    }

    //Email Check
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email Field is required";
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Password Checks
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password Field is required";
    }
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password Field is required";
    }
    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be atleast 6 characters long";
    }
    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};