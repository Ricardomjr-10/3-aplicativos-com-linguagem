const buttonCalcFixas = document.querySelector('#calcular-fixas');
const buttonCalcVariaveis = document.querySelector('#adicionar-despesa');
const inputAluguel = document.querySelector('#aluguel');
const inputContas = document.querySelector('#contas');
const divTotalFixas = document.querySelector('#total-fixas');
const inputAlimentacao = document.querySelector('#alimentacao');
const inputTransporte = document.querySelector('#transporte');
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

buttonCalcVariaveis.addEventListener('click', () => {
    const alimentacao = parseFloat(inputAlimentacao.value)
    const transporte = parseFloat(inputTransporte.value)
    const totalVariaveis = alimentacao + transporte;
    divTotalVariaveis.textContent = `Total Despesas Variáveis: R$${totalVariaveis.toFixed(2)}`
})