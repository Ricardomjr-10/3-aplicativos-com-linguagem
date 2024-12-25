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

buttonCalcFixas.addEventListener('click', () => {
    const aluguel = parseFloat(inputAluguel.value);
    const contas = parseFloat(inputContas.value);
    const totalFixas = aluguel + contas;
    divTotalFixas.textContent = `Total Despesas Fixas: R$${totalFixas.toFixed(2)}`;
    totalDespesas()
    previsaoDeGastos()
    
});

let despesas = [];

buttonCalcVariaveis.addEventListener('click', () => {
   
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
})

const totalDespesas = () => {
    const totalFixas = parseFloat(divTotalFixas.textContent.replace('Total Despesas Fixas: R$', ''));
    const totalVariaveis = parseFloat(divTotalVariaveis.textContent.replace('Total Despesas Variáveis: R$', ''));
    const total = totalFixas + totalVariaveis;
    divEconomia.textContent = `Total de despesas: R$${total.toFixed(2)}`;
    // Exemplo de dica
    if (total > 1000) {
        divDicas.textContent = 'Você está gastando muito, considere reduzir despesas não essenciais.';
    }
}
let despesa = []
for (let i = 0; i < despesas.length; i++) {
     despesa.push(despesas[i].valor)
    }
const previsaoDeGastos = () => {
    if(despesa.length === 0) return 0
        const soma = despesa.reduce((acc, valor) => acc + valor, 0)
        const previsao = soma / despesa.length
        divPrevisao.textContent = `Previsão de gastos com despesas: R$${previsao.toFixed(2)}`
    }
    