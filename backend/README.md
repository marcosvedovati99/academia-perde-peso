# MeuProjetoFinal
 Projeto Final do curso de Bootcamp

CREATE DATABASE projetodb1;

SHOW DATABASES;

USE projetodb1;

--- Criação da tabela aluno
CREATE TABLE aluno (
  id INT PRIMARY key auto_increment,
  nome VARCHAR(255),
  sexo CHAR(1),
  data_nascimento DATE
)AUTO_INCREMENT=1;

-- Criação da tabela professor
CREATE TABLE professor (
  id INT PRIMARY key auto_increment,
  nome VARCHAR(255),
  login VARCHAR(255),
  senha VARCHAR(255)
)AUTO_INCREMENT=1;

-- Criação da tabela avaliacao
CREATE TABLE avaliacao (
  id INT PRIMARY key auto_increment,
  id_aluno INT,
  id_professor INT,
  data_avaliacao DATE,
  peso DECIMAL(8, 2),
  altura DECIMAL(8, 2),
  FOREIGN KEY (id_aluno) REFERENCES aluno(id),
  FOREIGN KEY (id_professor) REFERENCES professor(id)
)AUTO_INCREMENT=1;

-- Criação da tabela classificao
CREATE TABLE classificacao (
  id INT PRIMARY key auto_increment,
  faixa_1 DECIMAL(8, 2),
  faixa_2 DECIMAL(8, 2),
  situacao VARCHAR(255)
)AUTO_INCREMENT=1;
