import util from 'util';
import { config } from '../config/config';
import langs from '../config/langs.json';

export default () => {
  const { defaultLang } = config;
  return function (req, res, next) {
    const translate = function (key, ...args) {
      const lang = req.headers['content-language'] || defaultLang;
      let text = key;
      if (langs[key] && langs[key][lang]) text = langs[key][lang];
      return util.format(text, ...args);
    };
    req.translate = translate;
    next();
  };
};
