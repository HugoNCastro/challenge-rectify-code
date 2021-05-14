const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, techs, url} = request.body;

  repositoryID = repositories.find(repository => repository.id === id);

  if (!repositoryID) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  const repository = { ...repositories[repositoryIndex], title, techs, url };

  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryID = repositories.find(repository => repository.id === id);

  if (!repositoryID) {
    return response.status(404).json({ error: "Repository not found" });
  }
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryID = repositories.find(repository => repository.id === id);

  if (!repositoryID) {
    return response.status(404).json({ error: "Repository not found" });
  }
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  const repository = repositories[repositoryIndex];

  let likes = repository.likes;
  repository.likes = likes + 1;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
