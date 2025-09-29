document.addEventListener('DOMContentLoaded', () => {
    const nameEl = document.querySelector('#name');
    const usernameEl = document.querySelector('#username');
    const avatarEl = document.querySelector('#avatar');
    const repositoryEl = document.querySelector('#repository');
    const followersEl = document.querySelector('#followers');
    const followingEl = document.querySelector('#following');
    const linkEl = document.querySelector('#link');

    const username = 'gabrielscarpino';
    const apiUrl = `https://api.github.com/users/${username}`;

    const fetchGithubUser = async () => {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();

            nameEl.innerText = json.name || 'N/A';
            usernameEl.innerText = json.login;
            avatarEl.src = json.avatar_url;
            repositoryEl.innerText = json.public_repos;
            followersEl.innerText = json.followers;
            followingEl.innerText = json.following;
            linkEl.href = json.html_url;

        } catch (error) {
            console.error('Error fetching GitHub user data:', error);
            alert(`Ocorreu um erro ao buscar o usuário ${username}. Tente novamente mais tarde.`);
        }
    };

    fetchGithubUser();
});
