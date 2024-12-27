const buttonCalcFixas = document.querySelector('#calcular-fixas');
const buttonCalcVariaveis = document.querySelector('#adicionar-despesa');
const inputAluguel = document.querySelector('#aluguel');
const inputContas = document.querySelector('#contas');
const divTotalFixas = document.querySelector('#total-fixas');
const inputDescricao = document.querySelector('#descricao');
const inputValor = document.querySelector('#valor');
const divTotalVariaveis = document.querySelector('#total-variaveis');
const ulDespesas = document.querySelector('#lista-despesas');
const divEconomia = document.querySelector('#economia');
const divDicas = document.querySelector('#dicas');
const divPrevisao = document.querySelector('#previsao')
const rendimento = document.querySelector('#rendimento');
const buttonAdicionarRendimento = document.querySelector('#adicionar-rendimento');
const exibirRendimento = document.querySelector('#exibirRendimento');
const porcentoFixas = document.querySelector('#porcentoFixas');
const porcentoVariaveis = document.querySelector('#porcentoVariaveis');

buttonAdicionarRendimento.addEventListener('click', () => {
    if (rendimento.value === '') return alert('Por favor, insira um rendimento mensal.');
    const rendimentoMensal = parseFloat(rendimento.value);
    exibirRendimento.textContent = `Rendimento Mensal: R$${rendimentoMensal.toFixed(2)}`;
})

buttonCalcFixas.addEventListener('click', () => {
    if (inputAluguel.value === '' || inputContas.value === '') return alert('Por favor, insira os valores de aluguel e contas.');
    const aluguel = parseFloat(inputAluguel.value);
    const contas = parseFloat(inputContas.value);
    const totalFixas = aluguel + contas;
    divTotalFixas.textContent = `Total Despesas Fixas: R$${totalFixas.toFixed(2)}`;
    totalDespesas()
    previsaoDeGastos()
    porcentagem(totalFixas, porcentoFixas)
    
});

let despesas = [];

buttonCalcVariaveis.addEventListener('click', () => {
    if (inputDescricao.value === '' || inputValor.value === '') return alert('Por favor, insira a descricao e o valor da despesa.');
    const descricao = inputDescricao.value
    const valor = parseFloat(inputValor.value)
    despesas.push({ descricao, valor })
    ulDespesas.innerHTML = ''
    despesas.forEach(despesa => {
        const li = document.createElement('li')
        li.textContent = `${despesa.descricao}: R$${despesa.valor.toFixed(2)}`
        ulDespesas.appendChild(li)
    })
    inputDescricao.value = ''
    inputValor.value = ''
    const totalVariaveis = despesas.reduce((total, despesa) => total + despesa.valor, 0);
    divTotalVariaveis.textContent = `Total Despesas Variáveis: R$${totalVariaveis.toFixed(2)}`
    totalDespesas()
    previsaoDeGastos()
    porcentagem(totalVariaveis, porcentoVariaveis)
})

const totalDespesas = () => {
    const totalFixas = parseFloat(divTotalFixas.textContent.replace('Total Despesas Fixas: R$', ''));
    const totalVariaveis = parseFloat(divTotalVariaveis.textContent.replace('Total Despesas Variáveis: R$', ''));
    const total = totalFixas + totalVariaveis;
    divEconomia.textContent = `Total de despesas: R$${total.toFixed(2)}`;
    // Exemplo de dica
    if (total > 1000) {
        divDicas.textContent = `você pode criar um orçamento equilibrado seguindo algumas diretrizes:
        50% para Necessidades Essenciais: Abrange despesas fixas e indispensáveis para a sua sobrevivência.
        30% para Desejos Pessoais: Inclui gastos variáveis com lazer, hobbies e outras atividades não essenciais.
        20% para Metas Financeiras: Destinado a investimentos, reserva de emergência e pagamento de dívidas.`
    }
}

const previsaoDeGastos = () => {
    if(despesas.length === 0) return 0
        const soma = despesas.reduce((acc, despesas) => acc + despesas.valor, 0)
        const previsao = soma / despesas.length
        divPrevisao.textContent = `Previsão de gastos com despesas variáveis: R$${previsao.toFixed(2)}`
    }
    
    const porcentagem = (despesa, div) => {
         const rendimentoMensal = parseFloat(rendimento.value);
        const porcentagem = (despesa / rendimentoMensal) * 100;
        div.textContent = `Porcentagem de gastos: ${porcentagem.toFixed(2)}%`;
    }