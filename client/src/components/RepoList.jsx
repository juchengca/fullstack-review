import React from 'react';

const RepoList = ({ repos }) => {

  /*
  const listRepos = repos.map((repo) =>
    <div> key={repo.id}
      <h3>{repo.name}</h3>
      <p>{repo.url}</p>
    </div>
  );*/

  return (
    //<h4> Repo List Component </h4>

    <div><h4>{repos.length ? 'Here are your top 25 repos in order of stargazers: ' : 'Add more repos!'}  </h4>
    <ol>{
    repos.map((repo) => <li style={{marginBottom: 20, marginLeft: 0}} key={repo.id}>
      <div>Name: <a style={{color: 'skyblue'}} href={repo.url}>{repo.name}</a></div>
      <div>Stargazers: {repo.stargazers}</div>
      </li>)}
    </ol>
    </div>

  )

}

export default RepoList;