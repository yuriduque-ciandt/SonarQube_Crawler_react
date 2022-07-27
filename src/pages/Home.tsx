import React from 'react';
import styled from 'styled-components';

import { useSonarRepos } from '../context/SonarReposContext';
import RepoCard from '../components/RepoCard';
import Input from '../components/Input';

import { FiSearch, FiRefreshCw } from 'react-icons/fi';

const Home = () => {
  const { repoList, isLoading, error, searchByName } = useSonarRepos();
  return (
    <Container>
      <HearderContent>
        <Title>Repositories {!!repoList.length && `(${repoList.length})`}</Title>
        <div>
          <RefreshButton onClick={() => window.location.reload()}>
            <FiRefreshCw size={20} />
          </RefreshButton>
          <Input
            placeholder="Search repository"
            Icon={FiSearch}
            onChange={(e) => searchByName(e.target.value)}
          />
        </div>
      </HearderContent>
      <Content>
        {isLoading && <p>Loading...</p>}
        {error && <p>Unable to retrieve repositories from sonar...</p>}
        {repoList.map((repo) => (
          <RepoCard key={repo.key} repo={repo} />
        ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 15% 20px 15%;
`;

const HearderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
  }
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.div`
  padding-top: 20px;
`;

const RefreshButton = styled.button`
  padding: 5px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;
`;

export default Home;
