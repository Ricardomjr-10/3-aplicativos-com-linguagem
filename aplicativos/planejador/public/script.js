document.addEventListener('DOMContentLoaded', () => {
    // Exemplo: Enviar dados de cadastro para o backend
    const formCadastro = document.getElementById('formCadastro'); // Supondo um formulário com id="formCadastro"
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;

            fetch('/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Usuário cadastrado:', data);
                // Atualizar a interface do usuário
            });
        });
    }
    // Outras funcionalidades do frontend aqui...
});