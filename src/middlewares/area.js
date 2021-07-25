import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
  const { Area } = db;
  return {
    createArea: async (req, res, next = null) => {
      const {
        body: {
          data: { name, description },
        },
      } = req;
      const queryBuild = { name, description };
      try {
        await Area.create(queryBuild);
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('sever.error', 500, req.translate, 'server.error')
        );
      }
    },
  };
}
