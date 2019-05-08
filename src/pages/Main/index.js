import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import logo from '../../assets/logo.png';
import { Container, Form } from './style';
import api from '../../services/api';

import CompareList from '../../components/CompareList';

moment.locale('pt-br');
const Main = () => {
  const [repositories, setRepositories] = useState(JSON.parse(localStorage.getItem('repos')) || []);
  const [repoInput, setRepoInput] = useState('');
  const [repositoryError, setRepositoryError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleUpdate = async (repo) => {
    setUpdateLoading(true);
    try {
      const { data: repository } = await api.get(`repos/${repo.owner.login}/${repo.name}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      const updatedRepos = repositories.map((reposit) => {
        if (reposit.id === repository.id) return repository;
        return reposit;
      });
      localStorage.setItem('repos', JSON.stringify(updatedRepos));
      setRepositories(updatedRepos);
      return;
    } catch (err) {
      setRepositoryError(true);
      return;
    } finally {
      setUpdateLoading(false);
    }
  };
  const handleAddRepo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: repository } = await api.get(`/repos/${repoInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      const lsContent = JSON.parse(localStorage.getItem('repos')) || [];
      localStorage.setItem('repos', JSON.stringify([...lsContent, repository]));
      setRepositories([...repositories, repository]);
      setRepositoryError(false);
    } catch (err) {
      setRepositoryError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <img src={logo} alt="Github Compare" />
      <Form withError={repositoryError} onSubmit={handleAddRepo}>
        <input
          value={repoInput}
          onChange={e => setRepoInput(e.target.value)}
          type="text"
          placeholder="usuário/repositório"
        />
        <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
      </Form>
      <CompareList
        repositories={repositories}
        setRepositories={setRepositories}
        handleUpdate={handleUpdate}
        updateLoading={updateLoading}
      />
    </Container>
  );
};

export default Main;
