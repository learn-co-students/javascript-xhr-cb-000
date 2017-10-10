function showRepositories(event, data){
    // console.log(this.responseText)
    //this would NOT work we need to parse the responseText string to JSON
    // let repoList = "<ul>"
    // for(var i = 0; i< this.responseText.length; i++){
    //   repoList += "<li>" + this.responseText[i]["name"] + "</li>"
    // }
    // repoList += "</ul>"

    var repos = JSON.parse(this.responseText)
    var repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
    document.getElementById('repositories').innerHTML = repoList
}

function getRepositories() {
	// body...
	const req = new XMLHttpRequest()
	req.addEventListener("load", showRepositories)
	req.open("GET", 'https://api.github.com/users/octocat/repos')
	req.send()
}

function getCommits(element){
	var name = element.dataset.repo
	const req = new XMLHttpRequest()
	req.addEventListener("load", showCommits)
	req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
	req.send()
}

function showCommits(){
	// console.log(this.responseText)
	var commits = JSON.parse(this.responseText)
	const commitList = `<ul> ${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById('commits').innerHTML = commitList
}