class Fila {
    constructor() {
        this.fila = []
        this.contador = 0
    }
    entarNaFila(cliente) {
        this.fila.push({
            cliente: cliente,
            numero: ++this.contador
        })
        console.log(`Cliente ${this.contador}, ${cliente} entrou na fila`)
    }

    sairDaFila() {
        let cliente = this.fila.shift()
        console.log(`Cliente ${cliente.numero}, ${cliente.cliente} saiu da fila`)
    }
    atenderCliente() {
        let tempoDeAtendimento = Math.floor(Math.random() * 10) + 1
        let cliente = this.fila[0]
        console.log(`Cliente ${cliente.numero}, ${cliente.cliente} ser  atendido no tempo de ${tempoDeAtendimento} segundos`)

        setTimeout(() => {
            this.sairDaFila()
            this.gerarRelatorioDeEspera()
            this.gerarRelatorioDeTempoNoSistema()
            this.gerarRelatorioDeTaxaDeOcupacao(60)
        }, tempoDeAtendimento * 1000)
    }
    gerarRelatorioDeEspera() {
        let tempoDeEsperaTotal = 0
        this.fila.forEach(cliente => {
            tempoDeEsperaTotal += cliente.numero
        })
        let tempoDeEsperaMedio = tempoDeEsperaTotal / this.fila.length
        console.log(`Relatório: Tempo médio de espera na fila: ${tempoDeEsperaMedio} segundos`)
    }
    gerarRelatorioDeTempoNoSistema() {
        let tempoNoSistemaTotal = 0
        this.fila.forEach(cliente => {
            tempoNoSistemaTotal += cliente.numero
        })
        let tempoNoSistemaMedio = tempoNoSistemaTotal / this.contador
        console.log(`Relatório: Tempo médio no sistema: ${tempoNoSistemaMedio.toFixed(1)} segundos`)
    }

    gerarRelatorioDeTaxaDeOcupacao(tempoTotalSimulacao) {
        let tempoOcupado = 0;
        this.fila.forEach(cliente => {
            tempoOcupado += cliente.numero;
        });
        let taxaDeOcupacao = (tempoOcupado / tempoTotalSimulacao) * 100;
        console.log(`Relatório: Taxa de Ocupação do Servidor: ${taxaDeOcupacao.toFixed(2)}%`);
    }

}


let fila = new Fila()
fila.entarNaFila('joao')
fila.entarNaFila('maria')
fila.entarNaFila('pedro')
fila.atenderCliente()





//console.log(fila)


