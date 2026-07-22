// js/api.js

// Cole aqui a URL gerada quando você publicar seu Apps Script como Web App (Executável)
const WEB_APP_URL = "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI"; 

export async function enviarOrcamentoParaPlanilha(dados) {
    if (WEB_APP_URL.includes("SUA_URL")) {
        throw new Error("Você precisa configurar a URL do Web App do Google Apps Script no arquivo js/api.js");
    }

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
