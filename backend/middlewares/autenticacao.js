// Middleware de verificação do token JWT
function verificarToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
  
    jwt.verify(token, 'chave-secreta-do-jwt', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }
  
      req.professorId = decoded.id;
      next();
    });
  }
  
  // Rota protegida que requer autenticação
  router.get('/protegida', verificarToken, (req, res) => {
    // Acesso autorizado, o ID do professor está disponível em req.professorId
    res.json({ message: 'Acesso autorizado', professorId: req.professorId });
  });
  