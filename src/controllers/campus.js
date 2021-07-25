import response from '../helpers/response';

export default function (db, services = null) {
  return {
    createCampus: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('campus.create'),
        data: null,
      });
    },
    updateCampus: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('campus.update'),
        data: null,
      });
    },
  };
}
