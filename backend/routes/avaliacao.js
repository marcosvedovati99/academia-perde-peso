const express = require('express');
const router = express.Router();
const Avaliacao = require('../models/Avaliacao.js');

// Rota para obter todas as avaliações
router.get('/', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll();
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter as avaliações.' });
  }
});

// Rota para obter uma avaliação específica
router.get('/aluno/:alunoId', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      where: {
        id_aluno: req.params.alunoId
      }
    });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter as avaliações.' });
  }
});

// Rota para obter uma avaliação específica
router.get('/:id', async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findByPk(req.params.id);
    if (avaliacao) {
      res.json(avaliacao);
    } else {
      res.status(404).json({ error: 'Avaliação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter a avaliação.' });
  }
});

// Rota para criar uma nova avaliação
router.post('/', async (req, res) => {
  try {
    const avaliacao = await Avaliacao.create(req.body);
    res.json(avaliacao);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar a avaliação.' });
  }
});

// Rota para atualizar uma avaliação existente
router.put('/:id', async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findByPk(req.params.id);
    if (avaliacao) {
      await avaliacao.update(req.body);
      res.json(avaliacao);
    } else {
      res.status(404).json({ error: 'Avaliação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a avaliação.' });
  }
});

// Rota para excluir uma avaliação existente
router.delete('/:id', async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findByPk(req.params.id);
    if (avaliacao) {
      await avaliacao.destroy();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Avaliação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir a avaliação.' });
  }
});

module.exports = router;
