module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    next();
  });
};
