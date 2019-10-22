// function getRepositories() {
//   var req = new XMLHttpRequest();
//   req.open("GET", 'https://api.github.com/users/Jawadban/repos');
//   req.send();
// }
function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  console.log(this.responseText)
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/Jawadban/repos')
  req.send()
}
function getCommits (elem) {
  const req = new XMLHttpRequest()
  var name = elem.dataset.repo
  req.addEventListener('load', showCommits)
  req.open("GET", 'https://api.github.com/repos/Jawadban/' + name + '/commits')
  req.send()
}

function showCommits(event, data) {
  var commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList;
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  var repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
