const expressJwt = require("express-jwt");
const secret = require("../configs/secret");

module.exports = expressJwt({
    secret: secret.key,
    algorithms: ["HS256"],
});
