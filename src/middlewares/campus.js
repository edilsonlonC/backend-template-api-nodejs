import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
  const { Campus } = db;
  return {
    createCampus: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      try {
        await Campus.create(data);
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
    updateCampus: async (req, res, next = null) => {
      const {
        body: { id, name, address, city, province },
      } = req;
      const queryBuild = {
        name,
        address,
        city,
        province,
      };
      try {
        await Campus.update(queryBuild, { where: { id } });
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
    campusExist: async (req, res, next = null) => {
      const {
        body: {
          data: { id, campusId },
        },
      } = req;
      const idCampus = campusId || id;
      if (!idCampus && req.url === '/user/update') return next();
      try {
        const campus = await Campus.findByPk(idCampus);
        if (campus) return next();
        response(res, req)(
          { data: null },
          new ResponseError(
            'campus.exist',
            400,
            req.translate,
            'campus.validators.exist.not'
          )
        );
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
  };
}
