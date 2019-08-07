function showRepositories () {
  let repos = JSON.parse(this.responseText);
  console.log(repos);

  const repoList = `<ol>${repos.map(
    r =>
    '<li>' +
    r.name +
    '- <a href="#" data-repo="' +
    r.name +
    '" onClick="getsCommits(this)">Gets Commits</a></li>'
  )
  .join('')}</ol>`;

  let div = document.getElementById('repositories');
  div.innerHTML = repoList;
}

function showCommits () {
  console.log(this.responseText);
  let commits = JSON.parse(this.responseText);

  const commitList = `<ul> ${commits.map(
    commit =>
    '<li><strong>' +
    commit.author.login +
    '</strong> - ' +
    commit.commit.message +
    '</li>'
  )
  .join('')}</ul>`;

  let div = document.getElementById('commits');
  div.innerHTML = commitList;
}

function getRepositories () {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function getsCommits (elm) {
  const name = elm.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}
