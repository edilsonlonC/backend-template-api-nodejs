import response from '../helpers/response';
import ResponseError from '../helpers/error';
import { generateHash } from '../helpers/crypt';

export default () => {
  return function (req, res, next) {
    const generateSignature = function (data, key) {
      let dataToSignature;
      if (typeof data !== 'string')
        dataToSignature = JSON.stringify(data) + key;
      else dataToSignature = data + key;

      const _signature = generateHash(dataToSignature, 'sha512');
      return _signature;
    };
    req.generateSignature = generateSignature;
    next();
  };
};
