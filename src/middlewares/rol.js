import response from '../helpers/response';
import ResponseErrror from '../helpers/error';

export default function (app, db) {
  const { Rol } = db;
  return {
    createRol: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      try {
        await Rol.create(data);
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseErrror('server.error', 500, 'Error inesperado')
        );
      }
    },
    updateRol: async (req, res, next = null) => {
      const {
        body: {
          data: { id, name },
        },
      } = req;
      try {
        const rol = await Rol.update(
          {
            name,
          },
          {
            where: {
              id,
            },
          }
        );
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseErrror('sever.error', 500, req.translate, 'server.error')
        );
      }
    },
    rolExists: async (req, res, next = null) => {
      const {
        body: {
          data: { id, rolId },
        },
      } = req;
      const idRol = rolId || id;
      /** Condition for update rol for user* */
      if (!idRol && req.url === '/user/update') return next();
      try {
        const rol = await Rol.findByPk(idRol);
        if (rol) return next();
        response(res, req)(
          { data: null },
          new ResponseErrror(
            'rol.exists',
            400,
            req.translate,
            'rol.validator.exist.not'
          )
        );
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseErrror('server.error', 500, req.translate, 'server.error')
        );
      }
    },
  };
}
