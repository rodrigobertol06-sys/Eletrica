// js/eletrica.js

export function calcularBitolaCabo(amperagem) {
    if (!amperagem || amperagem <= 0) return { erro: "Informe um valor válido de corrente." };

    // Critério básico simplificado para condutores de cobre (PVC em eletroduto)
    if (amperagem <= 21) {
        return { seccao: "2.5 mm²", disjuntor: "16A a 20A", justificativa: "Adequado para tomadas de uso geral (TUG) e circuitos de iluminação residenciais padrão." };
    } else if (amperagem <= 28) {
        return { seccao: "4.0 mm²", disjuntor: "25A", justificativa: "Indicado para circuitos de tomadas específicas de média potência (ex: micro-ondas, lavadoras)." };
    } else if (amperagem <= 36) {
        return { seccao: "6.0 mm²", disjuntor: "32A", justificativa: "Utilizado para alimentadores principais de pequenos quadros ou chuveiros elétricos de menor potência." };
    } else if (amperagem <= 50) {
        return { seccao: "10.0 mm²", disjuntor: "40A a 50A", justificativa: "Recomendado para entradas de energia de residências de médio porte ou equipamentos industriais leves." };
    } else {
        return { seccao: "16.0 mm² ou superior", disjuntor: "Acima de 50A", justificativa: "Alta carga. Necessário checar a queda de tensão e o método exato de instalação na norma NBR 5410." };
    }
}

export function obterExplicacaoLigacao(tipo) {
    const explicacoes = {
        "monofasico": "Composto por 1 Fase e 1 Neutro (tensão comum de 127V em muitas regiões ou 220V dependendo da concessionária). Ideal para cargas menores e residências compactas.",
        "bifasico": "Composto por 2 Fases e 1 Neutro (geralmente 220V entre fase e neutro ou fase-fase). Muito usado para alimentar chuveiros, ares-condicionados e motores de média potência.",
        "trifasico": "Composto por 3 Fases e 1 Neutro. Fornece maior rendimento para motores elétricos industriais e equilibra a carga de grandes instalações comerciais.",
        "estrela-triangulo": "Método de partida reduzida para motores trifásicos de indução. O motor arranca fechado em estrela (baixando a corrente de partida em cerca de 1/3) e depois comuta para triângulo para rodar com torque nominal."
    };
    return explicacoes[tipo] || "Selecione um tipo de ligação válido para ver a explicação técnica.";
}
