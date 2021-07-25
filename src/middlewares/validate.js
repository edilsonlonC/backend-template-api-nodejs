import { validationResult } from 'express-validator';

export default function (req, res, next) {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    const response = {};
    const arr = errorValidation.array();
    const keyFirstError = arr[0].msg;

    for (let i = 0; i < arr.length; i++) {
      if (!response[arr[i].param]) {
        response[arr[i].param] = [];
      }

      response[arr[i].param].push(arr[i].msg);
    }
    return res.status(400).json({
      statusCode: 400,
      message: req.translate(keyFirstError),
      errors: response,
    });
  }
  next();
}
