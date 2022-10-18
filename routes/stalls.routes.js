const authJwt = require('../middlewares/auth.jwt')
const controller = require("../controllers/stalls.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/stalls",[authJwt.verifyToken , authJwt.isFarmer], controller.getStalls)
  app.put('/stalls' , [authJwt.verifyToken , authJwt.isFarmer] , controller.putStalls)
  app.post('/stalls' , [authJwt.verifyToken , authJwt.isFarmer] , controller.postStalls)
  app.put('/reset' , [authJwt.isAdmin] , controller.resetStalls)
};
