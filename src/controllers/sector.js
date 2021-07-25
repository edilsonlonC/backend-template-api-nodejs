import response from '../helpers/response';

export default function (app, services = null) {
  return {
    createSector: (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('sector.create'),
        data: null,
      });
    },
  };
}
