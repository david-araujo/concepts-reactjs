import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    }

    repository.id = (await api.post('repositories', repository)).data.id

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if(response.status === 204){
      const updatedRepos = repositories.filter(repo => repo.id !== id)
      setRepositories(updatedRepos)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
