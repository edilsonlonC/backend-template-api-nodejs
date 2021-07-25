import response from '../helpers/response';

export default function (db, services = null) {
  return {
    login: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('login.succes'),
        data: { token: req.token, key: req.key, email: req.email },
      });
    },
    logout: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('logout.success'),
        data: null,
      });
    },
  };
}
