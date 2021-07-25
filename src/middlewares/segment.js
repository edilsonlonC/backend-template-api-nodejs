import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
  const { Segment } = db;

  return {
    createSegment: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      try {
        await Segment.create(data);
        next();
      } catch (e) {
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req, translate, 'server.error')
        );
      }
    },
  };
}
