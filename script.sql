CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  descricao TEXT,
  repositorio VARCHAR(255),
  video VARCHAR(100),
  tecnologias VARCHAR(255)
);
