function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoNames = `<ul>${repos.map(repo => '<li>' + repo["name"] + ' - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoNames
}

function getRepositories() {
  const request = new XMLHttpRequest();
  request.addEventListener("load", showRepositories)
  request.open("GET", 'https://api.github.com/users/dshiling/repos');
  request.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const request = new XMLHttpRequest();
  request.addEventListener("load", showCommits);
  request.open("GET", 'https://api.github.com/repos/dshiling/' + name + '/commits');
  request.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
