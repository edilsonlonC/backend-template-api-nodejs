import response from '../helpers/response';

export default function (app, services = null) {
  return {
    createSegment: (req, res, next) => {
      response(
        res,
        req
      )({
        message: req.translate('segment.create'),
        data: null,
      });
    },
  };
}
