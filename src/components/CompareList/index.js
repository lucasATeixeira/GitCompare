import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './style';

const CompareList = ({
  repositories, setRepositories, handleUpdate, updateLoading,
}) => {
  const handleDelete = (repository) => {
    const reposUpdated = repositories.filter(repo => repo.id !== repository.id);
    setRepositories(reposUpdated);
    localStorage.setItem('repos', JSON.stringify(reposUpdated));
  };
  return (
    <Container>
      {repositories.map(repository => (
        <Repository key={repository.id}>
          <button className="delete" type="button" onClick={() => handleDelete(repository)}>
            <i className="fa fa-close" />
          </button>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <strong>{repository.name}</strong>
            <small>{repository.owner.login}</small>
          </header>
          <ul>
            <li>
              {repository.stargazers_count} <small>start</small>
            </li>
            <li>
              {repository.forks_count} <small>forks</small>
            </li>
            <li>
              {repository.open_issues_count} <small>issues</small>
            </li>
            <li>
              {repository.lastCommit} <small>last commit</small>
            </li>
          </ul>
          <button onClick={() => handleUpdate(repository)} className="update" type="button">
            {updateLoading ? <i className="fa fa-spinner fa-pulse" /> : 'Atualizar'}
          </button>
        </Repository>
      ))}
    </Container>
  );
};

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  setRepositories: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  updateLoading: PropTypes.bool.isRequired,
};

export default CompareList;
