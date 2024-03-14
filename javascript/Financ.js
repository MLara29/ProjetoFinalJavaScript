function CalcularFinanciamento() {
    const emprestimo = parseFloat(document.getElementById("emprestimos").value);
    const taxa = parseFloat(document.getElementById("taxa").value);
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const entrada = parseFloat(document.getElementById("entrada").value);
    const emprestimoFinal = emprestimo - entrada;

    const resultado = document.getElementById('sac').checked ?
        calcularSAC(emprestimoFinal, taxa, parcelas) :
        calcularPRICE(emprestimoFinal, taxa, parcelas);

    exibirResultado(resultado);
}

function calcularSAC(emprestimo, taxa, parcelas) {
    const prestacoes = [];
    let saldoDevedor = emprestimo;
    const amortizacao = emprestimo / parcelas;

    for (let i = 0; i < parcelas; i++) {
        const juros = saldoDevedor * taxa / 100;
        const totalPrestacao = amortizacao + juros;
        saldoDevedor -= amortizacao;
        prestacoes.push({ prestacao: totalPrestacao.toFixed(2), juros: juros.toFixed(2), amortizacao: amortizacao.toFixed(2), saldoDevedor: saldoDevedor.toFixed(2) });
    }

    return prestacoes;
}

function calcularPRICE(emprestimo, taxa, parcelas) {
    const prestacoes = [];
    let saldoDevedor = emprestimo;
    const juros = Math.pow((1 + taxa / 100), parcelas);
    const prestacao = emprestimo * (taxa / 100 * juros) / (juros - 1);

    for (let i = 0; i < parcelas; i++) {
        const jurosPrestacao = saldoDevedor * taxa / 100;
        const amortizacaoPrestacao = prestacao - jurosPrestacao;
        saldoDevedor -= amortizacaoPrestacao;
        prestacoes.push({ prestacao: prestacao.toFixed(2), juros: jurosPrestacao.toFixed(2), amortizacao: amortizacaoPrestacao.toFixed(2), saldoDevedor: saldoDevedor.toFixed(2) });
    }

    return prestacoes;
}

function exibirResultado(resultado) {
    const tabelaResultado = document.getElementById("tabelaResultado").getElementsByTagName('tbody')[0];
    tabelaResultado.innerHTML = "";

    const tipoJuros = document.querySelector('input[name="tipo-juros"]:checked').value;

    let tabelaHTML = `<h2>${tipoJuros.toUpperCase()}</h2>`;

    resultado.forEach((item, index) => {
        tabelaHTML += `<tr><td>${index + 1}</td><td>${item.prestacao}</td><td>${item.juros}</td><td>${item.amortizacao}</td><td>${item.saldoDevedor}</td></tr>`;
    });

    tabelaResultado.innerHTML = tabelaHTML;
}
