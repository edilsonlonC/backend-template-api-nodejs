import response from '../helpers/response';

export default function controller(db, services = null) {
  const { User } = db;
  return {
    createUser(req, res, next) {
      response(
        res,
        req
      )({
        message: req.translate('user.create'),
        data: null,
      });
    },
    userList(req, res, next) {
      response(
        res,
        req
      )({
        message: req.translate('users.list'),
        data: { Users: req.users },
      });
    },
    userUpdate(req, res, next) {
      response(
        res,
        req
      )({
        message: req.translate('user.update'),
        data: null,
      });
    },
  };
}
