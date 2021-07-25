import response from '../helpers/response';
import ResponseError from '../helpers/error';
import { config } from '../config/config';

export default function (app, db) {
  const { User, Session } = db;
  const { secretKeyJwt, minExpiredSession } = config;
  return {
    login: async (req, res, next = null) => {
      const {
        body: {
          data: { email, password },
        },
      } = req;
      const user = await User.findOne({
        where: { email },
      });
      if (!user)
        return response(res, req)(
          { data: null },
          new ResponseError(
            'login.unauthorized',
            401,
            req.translate,
            'login.validators.user.notFound'
          )
        );
      if (!user.comparePassword(password))
        return response(res, req)(
          { data: null },
          new ResponseError(
            'login.unauthorized',
            401,
            req.translate,
            'login.validators.password.notMatch'
          )
        );
      // TODO: create session

      const token = user.generateToken(secretKeyJwt);

      const ip = req.connection.remoteAddress || req.headers['x-fowarded-for'];
      const queryBuilder = {
        token,
        ip,
        lastActivity: Date.now(),
        userId: user.id,
        active: 1,
        hidden: 0,
      };
      await Session.createOrUpdate(user.id, queryBuilder);
      req.key = user.secretKey;
      req.email = user.email;
      req.token = token;
      req.User = user;

      next();
    },
    logout: async (req, res, next = null) => {
      const tokenHeader = req.headers.authorization || req.body.token;
      if (!tokenHeader)
        response(res, req)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.token.exist'
          )
        );

      const token = tokenHeader.split(' ')[1];
      const session = await Session.findOne({
        where: {
          token,
        },
      });
      if (!session)
        response(res, req)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.session.notFound'
          )
        );
      await Session.update(
        { active: 0 },
        { where: { token, userId: session.userId } }
      );

      next();
    },
    checkAuth: async (req, res, next = null) => {
      const tokenHeader = req.headers.authorization || req.body.token;

      const ip = req.connection.remoteAddress || req.headers['x-fowarded-for'];

      if (!tokenHeader)
        response(res)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.token.exist'
          )
        );

      const token = tokenHeader.split(' ')[1];
      const session = await Session.findOne({
        where: {
          token,
        },
        include: { model: User },
      });
      if (!session)
        response(res)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.session.notFound'
          )
        );
      if (!session.active)
        return response(res)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.session.notActive'
          )
        );
      if (session.ip !== ip)
        return response(res)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.session.notActive'
          )
        );
      const { lastActivity } = session;
      const until = Date.now() - minExpiredSession;
      if (lastActivity < until)
        return response(res)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.session.expired'
          )
        );
      const sessionUser = session.User;
      if (sessionUser.blocked)
        return response(res, req)(
          { data: null },
          new ResponseError(
            'auth.fail',
            401,
            req.translate,
            'auth.validators.user.blocked'
          )
        );
      const sessionData = {
        lastActivity: Date.now(),
      };
      const sessionUpdated = await Session.createOrUpdate(
        session.userId,
        sessionData
      );
      req.sessionUser = sessionUpdated;
      req.userId = session.userId;
      req.User = session.User;
      next();
    },
  };
}
