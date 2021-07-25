import response from '../helpers/response';

export default function (db, services = null) {
  return {
    createRol: (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('rol.create'),
        data: null,
      });
    },
    updateRol: (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('rol.update'),
        data: null,
      });
    },
  };
}
