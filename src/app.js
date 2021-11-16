const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const alunos = [];

app.get("/api/v1/alunos", (request, response) => {
  return response.json({
    data: alunos,
  });
});

app.get("/api/v1/alunos/:id", (request, response) => {
  const { id } = request.params;

  const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

  if(alunoIndex < 0) {
    return response.status(400).json({
      error: [
        { code : '1', descricao: 'Aluno nao foi encontrado.' },
      ]
    });
  }

  const aluno = alunos[alunoIndex];

  return response.json({
    data: aluno,
  });
});

app.post("/api/v1/alunos", (request, response) => {
  const { nome, curso, semestre, ra, cpf, cidade } = request.body;

  const data = new Date();

  const aluno = {
    id: uuid(),
    nome,
    curso,
    semestre,
    ra,
    cpf,
    cidade,
    creation: data.toLocaleDateString(),
    lastUpdate: data.toLocaleDateString(),
  };

  alunos.push(aluno);

  return response.status(201).json({
    data: aluno,
  });
});

app.put("/api/v1/alunos/:id", (request, response) => {
  const { id } = request.params;
  const { nome, curso, semestre, ra, cpf, cidade } = request.body;

  const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

  if(alunoIndex < 0) {
    return response.status(400).json({
      error: [
        { code : '1', descricao: 'Aluno nao foi encontrado.' },
      ]
    });
  }

  const data = new Date();

  const aluno = {
    id,
    nome,
    curso,
    semestre,
    ra,
    cpf,
    cidade,
    lastUpdate: data.toLocaleDateString(),
  };

  alunos[alunoIndex] = aluno;

  return response.json({
    data: aluno,
  });
});

app.delete("/api/v1/alunos/:id", (request, response) => {
  const { id } = request.params;

  const alunoIndex = alunos.findIndex(aluno => aluno.id === id);

  if(alunoIndex < 0) {
    return response.status(400).json({
      error: [
        { code : '1', descricao: 'Aluno nao foi encontrado.' },
      ]
    });
  }

  alunos.splice(alunoIndex, 1);

  return response.status(204).send();
});

module.exports = app;