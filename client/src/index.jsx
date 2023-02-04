import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const getRepos = (callback) => {
    $.ajax({
      url:'http://localhost:1128/repos',
      type:"GET",
      data:'json',
      //contentType:"application/json; charset=utf-8",
      success: (response) => {
        callback(response);
      }
    })
  };

  useEffect(() => {
    getRepos((res) => {
        setRepos(res);
    })
  }, []);

  const search = (term) => {

    $.ajax({
      url:'http://localhost:1128/repos',
      type:"POST",
      data:JSON.stringify({'username':term}),
      contentType:"application/json; charset=utf-8",
      success: (response) => {
        getRepos((res) => {
          setRepos(res);
        })
      }
    })
    console.log(`${term} was searched`);
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));