import response from '../helpers/response';

export default function (db, services = null) {
  return {
    createArea: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('area.create'),
        data: null,
      });
    },
  };
}
