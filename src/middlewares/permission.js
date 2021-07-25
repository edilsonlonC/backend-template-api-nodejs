import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
  const { Permission, Rol } = db;
  return {
    createPermission: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      try {
        await Permission.create(data);
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
    updatePermission: async (req, res, next = null) => {
      const {
        body: {
          data: { id, name },
        },
      } = req;

      try {
        await Permission.update({ name }, { where: { id } });
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
    permissionExist: async (req, res, next = null) => {
      const {
        body: {
          data: { id },
        },
      } = req;
      const permission = await Permission.findByPk(id);
      console.log(permission);
      if (permission) return next();
      response(res, req)(
        { data: null },
        new ResponseError(
          'permission.exists',
          400,
          req.translate,
          'permission.validators.notExist'
        )
      );
    },
  };
}
