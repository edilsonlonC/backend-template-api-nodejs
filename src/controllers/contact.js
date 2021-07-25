import response from '../helpers/response';

export default function (db, services = null) {
  return {
    createContact: async (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('contact.create'),
        data: null,
      });
    },
  };
}
