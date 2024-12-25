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

buttonCalcFixas.addEventListener('click', () => {
    const aluguel = parseFloat(inputAluguel.value);
    const contas = parseFloat(inputContas.value);
    const totalFixas = aluguel + contas;
    divTotalFixas.textContent = `Total Despesas Fixas: R$${totalFixas.toFixed(2)}`;
});

let despesas = [];

buttonCalcVariaveis.addEventListener('click', (e) => {
   
    const descricao = inputDescricao.value
    const valor = parseFloat(inputValor.value)
    despesas.push({ descricao, valor })
    ulDespesas.innerHTML = ''
    despesas.forEach(despesa => {
        const li = document.createElement('li')
        li.textContent = `${despesa.descricao}: R$${despesa.valor.toFixed(2)}`
        ulDespesas.appendChild(li)
    })
    
    const totalVariaveis = despesas.reduce((total, despesa) => total + despesa.valor, 0);
    divTotalVariaveis.textContent = `Total Despesas Variáveis: R$${totalVariaveis.toFixed(2)}`
})