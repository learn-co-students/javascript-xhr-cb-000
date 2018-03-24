function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repolist = `<ul>${repos.map(r => '<li>' + r.name + '- <a href = "#" data-repo ="' + r.name +  '" onclick = "getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repolist
}

function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories)
  req.open('GET', "http://api.github.com/users/octocat/repos")
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', showCommits)
  console.log(name)
  req.open('GET', "https://api.github.com/repos/octocat/" + name + "/commits")
  req.send()
}

function showCommits(){
  var commits = JSON.parse(this.responseText)
  var commitsList = `<ul>${commits.map(c => '<li>' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById('commits').innerHTML = commitsList
}
