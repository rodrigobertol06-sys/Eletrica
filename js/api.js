// js/api.js

// URL oficial do Web App do Google Apps Script configurada
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxcsefSN2vcKLvr7KC00G8DbVi4JoclaZd7YROniWu_MTxF4Ws9Vp98fnzKAIc4pgeI/exec"; 

export async function enviarOrcamentoParaPlanilha(dados) {
    try {
        const resposta = await fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors", // Necessário para requisições cross-origin simples do Google Scripts
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        
        return { sucesso: true };
    } catch (erro) {
        console.error("Erro na comunicação com a planilha:", erro);
        throw erro;
    }
}
