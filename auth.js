function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token || token !== 'Bearer SaGrP9ojGS39hU9ljqbXxQ==') {
      return res.status(403).json({ mensaje: 'No autorizado' });
    }
  
    next();
  }
  
  module.exports = verifyToken;