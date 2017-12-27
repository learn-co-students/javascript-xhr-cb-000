function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)

  // console.log(this.responseText)

  let repoList = "<ul>"

  /*for(var i=0;i < repos.length; i++) {
    repoList += "<li>" + repos[i]["name"] + "</li>"
  }*/

  repoList += repos.reduce(function(total, current){
    return total + `<li>${current["name"]} - <a href="#" data-repo="${current["name"]}" onclick="getCommits(this)" >Get Commits</a></li>`
  }, "")

  repoList += "</ul>"

  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories)
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits(el){
  const name = el.dataset.repo

  const req = new XMLHttpRequest()

  req.addEventListener("load", showCommits)

  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()

}

function showCommits() {
  const commits = JSON.parse(this.responseText)

  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`

  document.getElementById("commits").innerHTML = commitsList
}
