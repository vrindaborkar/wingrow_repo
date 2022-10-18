const authJwt = require('../middlewares/auth.jwt')
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/inward" , [authJwt.verifyToken , authJwt.isFarmer] , controller.postInward);
  app.post("/outward" , [authJwt.verifyToken , authJwt.isFarmer] , controller.postOutward);
  app.get("/inward" , [authJwt.verifyToken , authJwt.isFarmer] , controller.getInward);
  app.get("/outward" , [authJwt.verifyToken , authJwt.isFarmer] , controller.getOutward);
};
