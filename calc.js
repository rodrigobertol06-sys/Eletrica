let circuitosCustomizados = [
    { nome: "Chuveiro Principal", potencia: 7500, tensao: 220 },
    { nome: "Ar Condicionado Quarto", potencia: 1200, tensao: 220 },
    { nome: "Tomadas Gerais (TUGs)", potencia: 4500, tensao: 127 },
    { nome: "Iluminação Residencial", potencia: 800, tensao: 127 }
];

function alternarCamposCalculadora() {
    const tipo = document.getElementById('tipoUso').value;
    document.querySelector('.campo-casa').style.display = (tipo === 'casa') ? 'grid' : 'none';
    document.querySelector('.campo-ar').style.display = (tipo === 'ar') ? 'grid' : 'none';
    document.querySelector('.campo-geral').style.display = (tipo === 'geral') ? 'grid' : 'none';
    
    if(tipo === 'casa') {
        atualizarListaCircuitosTela();
    }
}

function adicionarCircuitoCustomizado() {
    const nome = document.getElementById('novoNomeCircuito').value.trim();
    const potencia = parseFloat(document.getElementById('novoPotCircuito').value);
    const tensao = parseInt(document.getElementById('novoTensaoCircuito').value);

    if(!nome || isNaN(potencia) || potencia <= 0) {
        alert("Por favor, preencha o nome e uma potência válida em Watts.");
        return;
    }

    circuitosCustomizados.push({ nome, potencia, tensao });
    document.getElementById('novoNomeCircuito').value = "";
    document.getElementById('novoPotCircuito').value = "";
    atualizarListaCircuitosTela();
}

function removerCircuitoCustomizado(index) {
    circuitosCustomizados.splice(index, 1);
    atualizarListaCircuitosTela();
}

function atualizarListaCircuitosTela() {
    const ul = document.getElementById('listaCircuitosCustomizados');
    if(!ul) return;
    ul.innerHTML = "";
    if(circuitosCustomizados.length === 0) {
        ul.innerHTML = "<li style='color:#94a3b8; font-size:0.85rem;'>Nenhum circuito na lista. Adicione acima.</li>";
        return;
    }
    circuitosCustomizados.forEach((c, idx) => {
        ul.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 7px 10px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 0.85rem;">
                <span><strong>${c.nome}</strong> — ${c.potencia}W em ${c.tensao}V</span>
                <button type="button" onclick="removerCircuitoCustomizado(${idx})" style="background:#dc2626; color:white; border:none; border-radius:3px; padding:2px 8px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
            </li>
        `;
    });
}

const tabelaCabosNBR = [
    { secao: 1.5, amp2: 17.5, amp3: 15.5 },
    { secao: 2.5, amp2: 24,   amp3: 21 },
    { secao: 4.0, amp2: 32,   amp3: 28 },
    { secao: 6.0, amp2: 41,   amp3: 36 },
    { secao: 10.0, amp2: 57,  amp3: 50 },
    { secao: 16.0, amp2: 76,  amp3: 68 },
    { secao: 25.0, amp2: 101, amp3: 89 },
    { secao: 35.0, amp2: 125, amp3: 110 }
];

const disjuntoresPadrao = [10, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100, 125];

function dimensionarCircuitoUnico(nome, potenciaW, tensaoV, distanciaM, ehTrifasicoCarga = false) {
    let ib = ehTrifasicoCarga ? (potenciaW / (Math.sqrt(3) * tensaoV)) : (potenciaW / tensaoV);
    
    let dj = disjuntoresPadrao[0];
    for (let d of disjuntoresPadrao) {
        if (d >= ib) { dj = d; break; }
    }

    const col = ehTrifasicoCarga ? 'amp3' : 'amp2';
    let caboAmp = tabelaCabosNBR[0];
    for (let c of tabelaCabosNBR) {
        if (c[col] >= dj) { caboAmp = c; break; }
    }

    const deltaV = tensaoV * 0.04;
    const K = ehTrifasicoCarga ? Math.sqrt(3) : 2.0;
    const secaoMinQueda = (K * distanciaM * ib) / (56 * deltaV);

    let caboQueda = tabelaCabosNBR.find(c => c.secao >= secaoMinQueda) || tabelaCabosNBR[tabelaCabosNBR.length - 1];
    let caboFinal = (caboQueda.secao > caboAmp.secao) ? caboQueda : caboAmp;
    
    let minSecaoPermitida = (nome.toLowerCase().indexOf('iluminação') !== -1) ? 1.5 : 2.5;
    if (caboFinal.secao < minSecaoPermitida) {
        caboFinal = tabelaCabosNBR.find(c => c.secao >= minSecaoPermitida) || caboFinal;
    }

    let iz = caboFinal[col];
    let qVolts = (K * distanciaM * ib) / (56 * caboFinal.secao);
    let qPorcentagem = (qVolts / tensaoV) * 100;

    return {
        nome: nome,
        potenciaW: potenciaW,
        ib: ib,
        disjuntor: dj,
        caboSecao: caboFinal.secao,
        ampacidadeIz: iz,
        quedaPct: qPorcentagem
    };
}

function executarCalculoCompleto() {
    const tipoUso = document.getElementById('tipoUso').value;
    let redeSelecionada = document.getElementById('tipoRede').value;
    const tensaoBase = parseFloat(document.getElementById('tensaoVolts').value) || 220;
    const distancia = parseFloat(document.getElementById('distanciaMetros').value) || 15;
    const resDiv = document.getElementById('resultadoAvancado');
    resDiv.style.display = 'block';

    if (tipoUso === 'casa') {
        if(circuitosCustomizados.length === 0) {
            alert("Adicione pelo menos um circuito residencial.");
            resDiv.style.display = 'none';
            return;
        }

        let potTotalInstalada = 0;
        circuitosCustomizados.forEach(c => potTotalInstalada += c.potencia);
        const potenciaKWInstalada = potTotalInstalada / 1000;

        let fd = (potTotalInstalada > 20000) ? 0.45 : (potTotalInstalada > 10000 ? 0.55 : 0.60);
        const potDemanda = potTotalInstalada * fd;

        let textoRedeIdeal = "Bifásico (2F + N)";
        if (potenciaKWInstalada > 25 || potDemanda > 15000) {
            textoRedeIdeal = "Trifásico (3F + N)";
        } else if (potenciaKWInstalada <= 5) {
            textoRedeIdeal = "Monofásico (1F + N)";
        }

        let alertaInconsistencia = "";
        if (redeSelecionada === 'monofasico' && potenciaKWInstalada > 6) {
            alertaInconsistencia = `
                <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 12px; border-radius: 6px; margin-bottom: 15px; color: #92400e; font-size: 0.88rem;">
                    <strong>⚠️ ALERTA TÉCNICO NBR:</strong> A rede está configurada como <em>Monofásica</em>, mas a potência instalada (${potenciaKWInstalada.toFixed(1)} kW) exige o padrão <strong>${textoRedeIdeal}</strong>.
                </div>
            `;
        }

        let ibInstalado = (redeSelecionada === 'trifasico') ? (potDemanda / (Math.sqrt(3) * tensaoBase)) : (potDemanda / tensaoBase);
        let tipoDisjuntorTexto = (redeSelecionada === 'trifasico') ? "Trifásico (Tripolar)" : (redeSelecionada === 'bifasico' ? "Bifásico (Bipolar)" : "Monofásico (Unipolar)");

        let djGeral = disjuntoresPadrao[0];
        for (let d of disjuntoresPadrao) {
            if (d >= ibInstalado) { djGeral = d; break; }
        }

        const col = (redeSelecionada === 'trifasico') ? 'amp3' : 'amp2';
        let caboGeral = tabelaCabosNBR.find(c => c[col] >= djGeral) || tabelaCabosNBR[tabelaCabosNBR.length - 1];

        let listaCircuitos = [];
        circuitosCustomizados.forEach(c => {
            listaCircuitos.push(dimensionarCircuitoUnico(c.nome, c.potencia, c.tensao, distancia, false));
        });

        let htmlCircuitos = "";
        listaCircuitos.forEach((c, idx) => {
            htmlCircuitos += `
                <tr>
                    <td><strong>C${idx+1}:</strong> ${c.nome}</td>
                    <td>${c.potenciaW} W</td>
                    <td>${c.ib.toFixed(1)} A</td>
                    <td style="color: #2563eb; font-weight:bold;">${c.disjuntor} A</td>
                    <td style="color: #166534; font-weight:bold;">${c.caboSecao} mm²</td>
                    <td>${c.quedaPct.toFixed(1)}%</td>
                </tr>
            `;
        });

        resDiv.innerHTML = `
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 8px;">
                <h3 style="color: var(--primary); margin-top: 0; font-size: 1.05rem;"><i class="fa-solid fa-house-bolt"></i> Relatório de Dimensionamento Residencial</h3>
                ${alertaInconsistencia}
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 10px; border-radius: 6px; margin-bottom: 15px; color: #1e40af; font-size: 0.85rem;">
                    <strong><i class="fa-solid fa-lightbulb"></i> Recomendação NBR:</strong> ${textoRedeIdeal}
                </div>
                <div class="grid-3" style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 15px; font-size: 0.88rem;">
                    <div><strong>Potência Instalada:</strong> ${(potTotalInstalada/1000).toFixed(2)} kW</div>
                    <div><strong>Demanda Calculada:</strong> ${(potDemanda/1000).toFixed(2)} kW</div>
                    <div><strong>Corrente por Fase:</strong> <span style="color:#d97706; font-weight:bold;">${ibInstalado.toFixed(1)} A</span></div>
                    <div><strong>Disjuntor Geral:</strong> <span style="color:#2563eb; font-weight:bold;">${tipoDisjuntorTexto} ${djGeral}A</span></div>
                    <div><strong>Cabo Alimentador:</strong> <span style="color:#166534; font-weight:bold;">${caboGeral.secao} mm²</span></div>
                </div>
                <h4 style="color: var(--text-main); margin-bottom: 8px; font-size: 0.95rem;">Circuitos Individuais Calculados</h4>
                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Circuito</th>
                                <th>Potência</th>
                                <th>Corrente (Ib)</th>
                                <th>Disjuntor</th>
                                <th>Cabo</th>
                                <th>ΔV (%)</th>
                            </tr>
                        </thead>
                        <tbody>${htmlCircuitos}</tbody>
                    </table>
                </div>
            </div>
        `;
    } else if (tipoUso === 'ar') {
        const btu = parseInt(document.getElementById('btuAr').value);
        const tecnologia = document.getElementById('tecnologiaAr').value;
        let potenciaW = btu / 8.5; // Estimativa média aproximada
        if(tecnologia === 'inverter') potenciaW *= 0.8;

        let res = dimensionarCircuitoUnico("Ar Condicionado " + btu + " BTUs", potenciaW, tensaoBase, distancia, false);

        resDiv.innerHTML = `
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 8px;">
                <h3 style="color: var(--primary); margin-top: 0; font-size: 1.05rem;"><i class="fa-solid fa-snowflake"></i> Dimensionamento para Ar Condicionado (${btu} BTUs)</h3>
                <div class="grid-3" style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 0.88rem;">
                    <div><strong>Potência Estimada:</strong> ${potenciaW.toFixed(0)} W</div>
                    <div><strong>Corrente de Projeto:</strong> ${res.ib.toFixed(1)} A</div>
                    <div><strong>Disjuntor Recomendado:</strong> <span style="color:#2563eb; font-weight:bold;">${res.disjuntor} A (Curva C)</span></div>
                    <div><strong>Bitola do Cabo:</strong> <span style="color:#166534; font-weight:bold;">${res.caboSecao} mm²</span></div>
                    <div><strong>Queda de Tensão:</strong> ${res.quedaPct.toFixed(2)}%</div>
                </div>
            </div>
        `;
    } else {
        const pot = parseFloat(document.getElementById('potenciaUnicaGeral').value) || 2000;
        let res = dimensionarCircuitoUnico("Circuito Isolado", pot, tensaoBase, distancia, false);

        resDiv.innerHTML = `
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 8px;">
                <h3 style="color: var(--primary); margin-top: 0; font-size: 1.05rem;"><i class="fa-solid fa-bolt"></i> Dimensionamento de Circuito Único</h3>
                <div class="grid-3" style="background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 0.88rem;">
                    <div><strong>Potência Informada:</strong> ${pot} W</div>
                    <div><strong>Corrente (Ib):</strong> ${res.ib.toFixed(1)} A</div>
                    <div><strong>Disjuntor:</strong> <span style="color:#2563eb; font-weight:bold;">${res.disjuntor} A</span></div>
                    <div><strong>Cabo Mínimo:</strong> <span style="color:#166534; font-weight:bold;">${res.caboSecao} mm²</span></div>
                </div>
            </div>
        `;
    }
}
