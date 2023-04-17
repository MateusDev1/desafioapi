module.exports = (req, res, next) => {
  console.log(` O Ip: ${req.ip} acessou a rota: ${req.originalUrl} `);
  next();
};
