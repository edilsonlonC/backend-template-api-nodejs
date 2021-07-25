import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
  const { User, Area, Campus, Rol } = db;
  return {
    createUser: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      try {
        const user = await User.createWithAreas(data);
        return next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
    emailExist: async (req, res, next = null) => {
      const {
        body: {
          data: { email },
        },
      } = req;
      const user = await User.findOne({
        where: { email },
      });
      if (user) {
        response(res, req)(
          { data: null },
          new ResponseError(
            'email.exist',
            400,
            req.translate,
            'validators.email.alreadyExist'
          )
        );
        return;
      }
      next();
    },
    userList: async (req, res, next = null) => {
      try {
        const filter = req.body.data ? req.body.data : {};

        const users = await User.find(db, filter);
        req.users = users;
        next();
      } catch (e) {
        if (e.name === 'SequelizeDatabaseError') {
          response(res, req)(
            { data: null },
            new ResponseError(
              'unknown.filter',
              400,
              req.translate,
              'validators.filters.unknown'
            )
          );
        }
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
    updateUser: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      const { id } = data;
      delete data.id;
      try {
        const user = await User.update(data, { where: { id } });
        next();
      } catch (e) {
        console.log(e);
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
    userExist: async (req, res, next = null) => {
      const {
        body: {
          data: { id },
        },
      } = req;
      const user = await User.findByPk(id);
      if (user) return next();
      response(res, req)(
        { data: null },
        new ResponseError(
          'user.exist',
          400,
          req.translate,
          'validators.user.exist.not'
        )
      );
    },
  };
}
