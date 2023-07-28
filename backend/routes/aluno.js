const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno.js');

// Rota para obter todos os alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter os alunos.' });
  }
});

// Rota para obter um aluno específico
router.get('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter o aluno.' });
  }
});

// Rota para criar um novo aluno
router.post('/', async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o aluno.' });
  }
});

// Rota para atualizar um aluno existente
router.put('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (aluno) {
      await aluno.update(req.body);
      res.json(aluno);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o aluno.' });
  }
});

// Rota para excluir um aluno existente
router.delete('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (aluno) {
      await aluno.destroy();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Aluno não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o aluno.' });
  }
});

module.exports = router;
