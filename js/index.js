
document.addEventListener('DOMContentLoaded', event =>{
    const githubForm = document.getElementById('github-form')
    githubForm.addEventListener('submit', handleSubmit)
    
    function handleSubmit(event){
        event.preventDefault();
        const searchWord = event.target.querySelector('#search').value

        fetch(`https://api.github.com/search/users?q=${searchWord}`)
        .then(result => result.json())
        .then(githubUsers => {
            for(user in githubUsers.items){
                const domUserList = document.getElementById('user-list')
                const domUser = document.createElement('li')
                domUser.innerHTML = `<div>
                    <img src="${githubUsers.items[user].avatar_url}" width="100px" height="100px"/>
                    <div class="github-user" style="cursor:pointer">${githubUsers.items[user].login}</div>
                    <a href="${githubUsers.items[user].html_url}" target="_blank">view user on github</a>
                </div>`  
                domUser.style.marginBottom = "20px"
                domUser.style.marginTop = "20px"

                domUserList.append(domUser)

                document.querySelectorAll('.github-user').forEach(handleClickOnUserName)
            }
        })
    }

    function handleClickOnUserName(domUser){
        domUser.addEventListener('click', event =>{
            fetch(`https://api.github.com/users/${domUser.textContent}/repos`)
            .then(result => result.json())
            .then(repos => {
                const reposList = document.getElementById('repos-list')
                repos.forEach(repo =>{
                    const repoItem = document.createElement('li')
                    repoItem.textContent = repo.name
                    reposList.append(repoItem)
                })
            })
        })
    }
})
