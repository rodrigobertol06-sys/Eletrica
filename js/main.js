// js/main.js
import { calcularBitolaCabo, obterExplicacaoLigacao } from './eletrica.js';
import { enviarOrcamentoParaPlanilha } from './api.js';

// 1. Evento do Balão de Cálculo de Cabos
document.getElementById('btnCalcularCabo').addEventListener('click', () => {
    const amperes = parseFloat(document.getElementById('inputAmperes').value);
    const resultadoDiv = document.getElementById('resultadoCabo');
    
    const res = calcularBitolaCabo(amperes);
    
    resultadoDiv.style.display = 'block';
    if (res.erro) {
        resultadoDiv.innerHTML = `<span style="color: red;">${res.erro}</span>`;
    } else {
        resultadoDiv.innerHTML = `
            <strong>Cabo Recomendado:</strong> ${res.seccao}<br>
            <strong>Disjuntor Sugerido:</strong> ${res.disjuntor}<br>
            <span class="explicacao"><strong>Por quê?</strong> ${res.justificativa}</span>
        `;
    }
});

// 2. Evento do Balão de Guia Técnico (Select)
document.getElementById('selectLigacao').addEventListener('change', (e) => {
    const tipo = e.target.value;
    const explicacaoDiv = document.getElementById('resultadoExplicacao');
    explicacaoDiv.innerText = obterExplicacaoLigacao(tipo);
});

// 3. Evento do Balão de Orçamento (Envio para o Google Sheets)
document.getElementById('formOrcamento').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btnSalvar = document.getElementById('btnSalvar');
    const statusDiv = document.getElementById('statusEnvio');
    
    const dados = {
        cliente: document.getElementById('clienteNome').value,
        servico: document.getElementById('servicoDesc').value,
        valor: document.getElementById('valorTotal').value,
        data: new Date().toLocaleDateString('pt-BR')
    };

    btnSalvar.disabled = true;
    btnSalvar.innerText = "Salvando...";
    statusDiv.style.display = 'block';
    statusDiv.innerText = "Enviando dados para a planilha...";

    try {
        await enviarOrcamentoParaPlanilha(dados);
        statusDiv.innerHTML = `<span style="color: green; font-weight: bold;">✔ Orçamento registrado com sucesso na planilha!</span>`;
        document.getElementById('formOrcamento').reset();
    } catch (erro) {
        statusDiv.innerHTML = `<span style="color: red;">Erro ao salvar. Verifique a URL do Apps Script.</span>`;
    } finally {
        btnSalvar.disabled = false;
        btnSalvar.innerText = "Salvar na Planilha";
    }
});
