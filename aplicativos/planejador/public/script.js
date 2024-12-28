document.addEventListener('DOMContentLoaded', () => {
    const cadastrarUsuarioForm = document.getElementById('cadastrarUsuarioForm');
    const criarEventoForm = document.getElementById('criarEventoForm');
    const registrarDisponibilidadeForm = document.getElementById('registrarDisponibilidadeForm');
    const adicionarTarefaForm = document.getElementById('adicionarTarefaForm');
    const listarDatasIdeaisBtn = document.getElementById('listarDatasIdeaisBtn');
    const datasIdeaisDiv = document.getElementById('datasIdeais');

    if (cadastrarUsuarioForm) {
        cadastrarUsuarioForm.addEventListener('submit', (event) => {
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
                alert("Usuário cadastrado com sucesso!"); // Feedback para o usuário
                cadastrarUsuarioForm.reset();// Limpa o formulário
            })
            .catch(error => {
                console.error("Erro ao cadastrar usuário:", error);
                alert("Erro ao cadastrar usuário. Verifique o console para mais detalhes.");
            });
        });
    }

    if (criarEventoForm) {
        criarEventoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nome = document.getElementById('nomeEvento').value;
            const data = document.getElementById('dataEvento').value;
            const organizador_id = document.getElementById('organizadorId').value;

            fetch('/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, data, organizador_id })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Evento criado:', data);
                alert("Evento criado com sucesso!");
                criarEventoForm.reset();
            })
            .catch(error => {
                console.error("Erro ao criar evento:", error);
                alert("Erro ao criar evento. Verifique o console para mais detalhes.");
            });
        });
    }

    if (registrarDisponibilidadeForm) {
        registrarDisponibilidadeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usuario_id = document.getElementById('usuarioIdDisp').value;
            const evento_id = document.getElementById('eventoIdDisp').value;
            const data = document.getElementById('dataDisp').value;
            const disponivel = document.getElementById('disponivel').checked ? 1 : 0;

            fetch('/disponibilidades', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario_id, evento_id, data, disponivel })
            })
            .then(response => response.json())
            .then(data => {
              alert("Disponibilidade registrada com sucesso!");
              registrarDisponibilidadeForm.reset();
            })
             .catch(error => {
                console.error("Erro ao registrar disponibilidade:", error);
                alert("Erro ao registrar disponibilidade. Verifique o console para mais detalhes.");
            });
        });
    }

    if (adicionarTarefaForm) {
        adicionarTarefaForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const evento_id = document.getElementById('eventoIdTarefa').value;
            const descricao = document.getElementById('descricaoTarefa').value;
            const atribuido_a = document.getElementById('atribuidoATarefa').value;

            fetch('/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ evento_id, descricao, atribuido_a })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Tarefa adicionada:', data);
                alert("Tarefa adicionada com sucesso!");
                adicionarTarefaForm.reset();
            })
            .catch(error => {
                console.error("Erro ao adicionar tarefa:", error);
                alert("Erro ao adicionar tarefa. Verifique o console para mais detalhes.");
            });
        });
    }

    if (listarDatasIdeaisBtn) {
        listarDatasIdeaisBtn.addEventListener('click', () => {
            const eventoId = document.getElementById('eventoIdDatasIdeais').value;

            fetch(`/eventos/${eventoId}/datas-ideais`)
                .then(response => response.json())
                .then(datas => {
                    datasIdeaisDiv.innerHTML = ''; // Limpa resultados anteriores
                    if (datas.length === 0) {
                        datasIdeaisDiv.innerHTML = "<p>Nenhuma data disponível para este evento.</p>";
                    } else {
                        const ul = document.createElement('ul');
                        datas.forEach(data => {
                            const li = document.createElement('li');
                            li.textContent = `${data.data} (Disponíveis: ${data.disponiveis})`;
                            ul.appendChild(li);
                        });
                        datasIdeaisDiv.appendChild(ul);
                    }
                })
                .catch(error => {
                    console.error("Erro ao listar datas ideais:", error);
                    alert("Erro ao listar datas ideais. Verifique o console para mais detalhes.");
                });
        });
    }
});