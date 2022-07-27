const APIURL = "https://api.github.com/users"
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// GITHUB USERS 
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('No Profile With This Username')
        }
    }
}

// GITHUB REPOS
async function getRepos(username) {
    try {
        const {data} = await axios (APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch (err) {
        createErrorCard('Rproblem Fetching Repos')
    }
}

// CREAUTE USER CARD
function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class= "card">
    <div>
        <img src "${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>

        <div class="user-info">
        <h2>${userID}</h2>
            ${userBio}
            <ul>
            <li>${user.followers} <straong>Followers</straong></li>
            <li>${user.following} <straong>Following</straong></li>
            <li>${user.public-repos} <straong>Repos</straong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>`

    main.innerHTML = cardHTML
}

// CARD ERROR CARD
function createErrorCard(msg) {
    const cardHTML = `
    <div class= "card">
        <h1>${msg}</h1>
    </div>
    `
    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
    .slice(0,5)
    .forEach(repo => {
        const reposEl = document.createElement('a')
        reposEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name
        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)

        search.value= ''
    }
})