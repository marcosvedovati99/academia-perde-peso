const express = require('express');
const router = express.Router();
const Classificacao = require('../models/Classificacao.js');

// Rota para obter todas as classificações
router.get('/', async (req, res) => {
  try {
    const classificacoes = await Classificacao.findAll();
    res.json(classificacoes);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter as classificações.' });
  }
});

// Rota para obter uma classificação específica
router.get('/:id', async (req, res) => {
  try {
    const classificacao = await Classificacao.findByPk(req.params.id);
    if (classificacao) {
      res.json(classificacao);
    } else {
      res.status(404).json({ error: 'Classificação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter a classificação.' });
  }
});

// Rota para criar uma nova classificação
router.post('/', async (req, res) => {
  try {
    const classificacao = await Classificacao.create(req.body);
    res.json(classificacao);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar a classificação.' });
  }
});

// Rota para atualizar uma classificação existente
router.put('/:id', async (req, res) => {
  try {
    const classificacao = await Classificacao.findByPk(req.params.id);
    if (classificacao) {
      await classificacao.update(req.body);
      res.json(classificacao);
    } else {
      res.status(404).json({ error: 'Classificação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a classificação.' });
  }
});

// Rota para excluir uma classificação existente
router.delete('/:id', async (req, res) => {
  try {
    const classificacao = await Classificacao.findByPk(req.params.id);
    if (classificacao) {
      await classificacao.destroy();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Classificação não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir a classificação.' });
  }
});

module.exports = router;
