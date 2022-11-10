const verifySignUp  = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup",[verifySignUp.checkDuplicatePhone],controller.signup );
  app.post("/auth/signin", controller.signin);
  app.put("/auth/user" , upload.single('photo') , controller.postPic)
  app.post("/auth/address", controller.addAddress);
};
