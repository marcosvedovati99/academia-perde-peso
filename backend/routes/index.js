const express = require('express');
const router = express.Router();

// Rota raiz
router.get('/', (req, res) => {
  res.send('Bem-vindo à API do meu projeto!');
});

module.exports = router;
