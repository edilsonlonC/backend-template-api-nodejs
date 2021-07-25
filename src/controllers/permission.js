import response from '../helpers/response';

export default function (db, services = null) {
  return {
    createPermission: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('permission.create'),
        data: null,
      });
    },
    updatePermission: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('permission.update'),
        data: null,
      });
    },
  };
}
