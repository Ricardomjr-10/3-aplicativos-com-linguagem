const buttonCalcFixas = document.querySelector('#calcular-fixas');
const inputAluguel = document.querySelector('#aluguel');
const inputContas = document.querySelector('#contas');
const divTotalFixas = document.querySelector('#total-fixas');

buttonCalcFixas.addEventListener('click', () => {
    const aluguel = parseFloat(inputAluguel.value);
    const contas = parseFloat(inputContas.value);
    const totalFixas = aluguel + contas;
    divTotalFixas.textContent = `Total Despesas Fixas: R$${totalFixas.toFixed(2)}`;
});