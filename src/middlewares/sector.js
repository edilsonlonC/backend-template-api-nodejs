import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
  const { Sector } = db;

  return {
    createSector: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      try {
        await Sector.create(data);
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req, translate, 'server.error')
        );
      }
    },
    sectorExist: async (req, res, next = null) => {
      const {
        body: {
          data: { sectorId },
        },
      } = req;
      const sector = await Sector.findByPk(sectorId);
      if (sector) return next();
      response(res, req)(
        { data: null },
        new ResponseError(
          'sector.exists',
          400,
          req.translate,
          'sector.validators.notExist'
        )
      );
    },
  };
}
