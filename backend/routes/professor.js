const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor.js');
const jwt = require('jsonwebtoken');

// Rota para obter todos os professores
router.get('/', async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter os professores.' });
  }
});

// Rota para obter um professor específico
router.get('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      res.json(professor);
    } else {
      res.status(404).json({ error: 'Professor não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter o professor.' });
  }
});

// Rota para criar um novo professor
router.post('/', async (req, res) => {
  try {
    const professor = await Professor.create(req.body);
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o professor.' });
  }
});

// Rota para atualizar um professor existente
router.put('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      await professor.update(req.body);
      res.json(professor);
    } else {
      res.status(404).json({ error: 'Professor não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o professor.' });
  }
});

// Rota para excluir um professor existente
router.delete('/:id', async (req, res) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      await professor.destroy();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Professor não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o professor.' });
  }
});

// Rota para fazer login do professor
router.post('/login', async (req, res) => {
  try {
    const { login, senha } = req.body;
    const professor = await Professor.findOne({ where: { login, senha } });

    if (professor) {
      // Gerar token JWT com informações relevantes
      const token = jwt.sign({ id: professor.id, login: professor.login }, 'chave-secreta-do-jwt', { expiresIn: '1h' });

      // Login bem-sucedido, retornar token
      res.json({ message: 'Login bem-sucedido', token });
    } else {
      // Credenciais inválidas
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    // Erro durante o processo de login
    res.status(500).json({ error: 'Ocorreu um erro durante o login do professor' });
  }
});

module.exports = router;