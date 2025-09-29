document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos de exibição
    const nameEl = document.querySelector('#name');
    const usernameEl = document.querySelector('#username');
    const avatarEl = document.querySelector('#avatar');
    const repositoryEl = document.querySelector('#repository');
    const followersEl = document.querySelector('#followers');
    const followingEl = document.querySelector('#following');
    const linkEl = document.querySelector('#link');

    // NOVOS elementos para a busca
    const inputUsernameEl = document.querySelector('#input-username');
    const searchButtonEl = document.querySelector('#search-button');

    /**
     * Limpa os campos de exibição caso a busca falhe ou não encontre o usuário.
     */
    const clearUserInfo = () => {
        nameEl.innerText = 'N/A';
        usernameEl.innerText = 'N/A';
        avatarEl.src = ''; // Limpa a imagem, pode ser substituída por uma imagem padrão
        repositoryEl.innerText = '0';
        followersEl.innerText = '0';
        followingEl.innerText = '0';
        linkEl.href = '#';
        linkEl.target = '_self'; // Opcional: Garante que volte ao padrão caso a busca falhe.
    };

    /**
     * Busca os dados do usuário do GitHub e atualiza a interface.
     * @param {string} username O nome de usuário do GitHub a ser buscado.
     */
    const fetchGithubUser = async (username) => {
        if (!username) {
            alert('Por favor, digite um nome de usuário.');
            return;
        }

        const apiUrl = `https://api.github.com/users/${username}`;

        try {
            const response = await fetch(apiUrl);

            if (response.status === 404) {
                clearUserInfo();
                throw new Error(`Usuário não encontrado: ${username}`);
            }

            if (!response.ok) {
                clearUserInfo();
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const json = await response.json();

            // Atualiza os elementos com os dados do JSON
            nameEl.innerText = json.name || json.login; // Usa o login se o nome for nulo
            usernameEl.innerText = json.login;
            avatarEl.src = json.avatar_url;
            repositoryEl.innerText = json.public_repos;
            followersEl.innerText = json.followers;
            followingEl.innerText = json.following;
            linkEl.href = json.html_url;
            // LINHA ADICIONADA: Configura o link para abrir em uma nova guia
            linkEl.target = '_blank'; 

        } catch (error) {
            console.error('Erro ao buscar dados do usuário do GitHub:', error);
            alert(`Ocorreu um erro ao buscar o usuário ${username}. Verifique se o nome de usuário está correto.`);
        }
    };

    /**
     * Manipulador de evento para o clique do botão de busca.
     */
    const handleSearch = () => {
        // Pega o valor do campo de entrada, removendo espaços em branco extras
        const username = inputUsernameEl.value.trim();
        fetchGithubUser(username);
    };

    // Adiciona o listener de evento ao botão de busca
    searchButtonEl.addEventListener('click', handleSearch);

    // Opcional: Adiciona a busca ao pressionar 'Enter' no campo de texto
    inputUsernameEl.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // Removida a chamada inicial, agora a busca só acontece no clique do botão.
    // Se quiser carregar um usuário padrão ao iniciar, descomente e ajuste:
    // fetchGithubUser('gabrielscarpino'); 
});