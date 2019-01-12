import validator from 'validator';
import checkEmpty from '../../utilities/checkEmpty';

// class LoginValidation {
//   /**
//    * @param {object} req Takes login request
//    * @param {object} res Response to request
//    * @param {object} next Move to the next middleware or function
//    * @return {object} User validation response to user
//    */
//   static validateLogin(req, res,next) {
//   }
// }
// export default LoginValidation;

/* eslint-disable no-param-reassign */
export default function loginValidation(req, res, next) {
  const errors = {};

  errors.emailError = validator.isEmail(req.userEmail) ? undefined : 'Invalid email suplied';
  errors.password = !checkEmpty(req.password) ? req.password : (errors.password = 'password field is required');

  if (validator.isEmail(req.userEmail)) {
    errors.userEmail = 'user email is invalid';
  }

  if (!validator.isLength(req.password, { min: 5, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  /* return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors)
  }; */

  if (Object.keys(errors).length) {
    res.send('Error');
    return;
  }

  next();
}
/* eslint-enable no-param-reassign */
