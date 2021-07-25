import response from '../helpers/response';
import ResponseError from '../helpers/error';

export default function (app, db) {
  const { Contact } = db;
  return {
    createContact: async (req, res, next = null) => {
      const {
        body: { data },
      } = req;
      try {
        await Contact.create(data);
        next();
      } catch (e) {
        console.error('error here --> ', e);
        response(res, req)(
          { data: null },
          new ResponseError('server.error', 500, req.translate, 'server.error')
        );
      }
    },
  };
}
