let circuitosCustomizados = [
    { nome: "Chuveiro 1", potencia: 7500, tensao: 220 },
    { nome: "Chuveiro 2", potencia: 7500, tensao: 220 },
    { nome: "Ar Condicionado Inverter", potencia: 1091, tensao: 220 },
    { nome: "Tomadas Gerais (TUGs)", potencia: 4000, tensao: 127 }
];

function alternarCamposCalculadora() {
    const tipo = document.getElementById('tipoUso').value;
    document.querySelectorAll('.campo-geral').forEach(c => c.style.display = (tipo === 'geral') ? 'block' : 'none');
    document.querySelectorAll('.campo-ar').forEach(c => c.style.display = (tipo === 'ar') ? 'block' : 'none');
    document.querySelectorAll('.campo-casa').forEach(c => c.style.display = (tipo === 'casa') ? 'grid' : 'none');
    if(tipo === 'casa') {
        atualizarListaCircuitosTela();
        document.getElementById('btnCalcularAvancado').click();
    }
}

function adicionarNovaSugestaoDatalist() {
    const input = document.getElementById('novoNomeCircuito');
    const valor = input.value.trim();
    const datalist = document.getElementById('sugestoesCircuitos');

    if (!valor) {
        alert("Digite o nome do novo circuito ou equipamento para incluí-lo na lista.");
        return;
    }

    let existe = false;
    for (let opt of datalist.options) {
        if (opt.value.toLowerCase() === valor.toLowerCase()) {
            existe = true;
            break;
        }
    }

    if (!existe) {
        const novaOpcao = document.createElement('option');
        novaOpcao.value = valor;
        datalist.appendChild(novaOpcao);
        alert(`"${valor}" foi adicionado com sucesso às opções de equipamentos!`);
    } else {
        alert(`"${valor}" já consta na lista de sugestões.`);
    }
}

function adicionarCircuitoCustomizado() {
    const nome = document.getElementById('novoNomeCircuito').value.trim();
    const potencia = parseFloat(document.getElementById('novoPotCircuito').value);
    const tensao = parseInt(document.getElementById('novoTensaoCircuito').value);

    if(!nome || isNaN(potencia) || potencia <= 0) {
        alert("Por favor, preencha o nome e uma potência válida.");
        return;
    }

    circuitosCustomizados.push({ nome, potencia, tensao });
    document.getElementById('novoNomeCircuito').value = "";
    atualizarListaCircuitosTela();
    document.getElementById('btnCalcularAvancado').click();
}

function removerCircuitoCustomizado(index) {
    circuitosCustomizados.splice(index, 1);
    atualizarListaCircuitosTela();
    document.getElementById('btnCalcularAvancado').click();
}

function atualizarListaCircuitosTela() {
    const ul = document.getElementById('listaCircuitosCustomizados');
    if(!ul) return;
    ul.innerHTML = "";
    if(circuitosCustomizados.length === 0) {
        ul.innerHTML = "<li style='color:#94a3b8;'>Nenhum circuito adicionado ainda.</li>";
        return;
    }
    circuitosCustomizados.forEach((c, idx) => {
        ul.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
                <span><strong>${c.nome}</strong> — ${c.potencia}W em ${c.tensao}V</span>
                <button type="button" onclick="removerCircuitoCustomizado(${idx})" style="background:#dc2626; color:white; border:none; border-radius:3px; padding:2px 6px; cursor:pointer; font-size:0.75rem;"><i class="fa-solid fa-trash"></i></button>
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
    { secao: 35.0, amp2: 125, amp3: 110 },
    { secao: 50.0, amp2: 151, amp3: 134 },
    { secao: 70.0, amp2: 192, amp3: 171 }
];

const disjuntoresPadrao = [10, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100, 125, 160];

function btuParaWatts(btu) {
    return Math.round(btu / 11);
}

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
        caboFinal = tabelaCabosNBR.find(c => c.secao >= minSecaoPermitida);
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

document.addEventListener('DOMContentLoaded', () => {
    const btnCalc = document.getElementById('btnCalcularAvancado');
    if(btnCalc) {
        btnCalc.addEventListener('click', function() {
            const tipo = document.getElementById('tipoUso').value;
            let rede = document.getElementById('tipoRede').value;
            const tensao = parseFloat(document.getElementById('tensaoVolts').value) || 220;
            const distancia = parseFloat(document.getElementById('distanciaMetros').value) || 15;
            const resDiv = document.getElementById('resultadoAvancado');
            resDiv.style.display = 'block';

            if (tipo === 'casa') {
                if(circuitosCustomizados.length === 0) {
                    alert("Adicione pelo menos um circuito na lista.");
                    resDiv.style.display = 'none';
                    return;
                }

                let potTotalInstalada = 0;
                circuitosCustomizados.forEach(c => potTotalInstalada += c.potencia);
                const potenciaKWInstalada = potTotalInstalada / 1000;

                let fd = 0.60;
                if (potTotalInstalada > 10000) fd = 0.55;
                if (potTotalInstalada > 20000) fd = 0.45;

                const potDemanda = potTotalInstalada * fd;

                let sugestaoRede = "Bifásico";
                let redeCalculada = rede; 

                if (potenciaKWInstalada <= 25) {
                    sugestaoRede = "Bifásico (Atende perfeitamente à demanda calculada e à carga instalada)";
                    redeCalculada = "bifasico";
                } else {
                    sugestaoRede = "Trifásico (Indicado para carga instalada acima de 25 kW)";
                    redeCalculada = "trifasico";
                }

                let ibInstalado = 0;
                let tipoDisjuntorTexto = "";

                if (redeCalculada === 'trifasico') {
                    ibInstalado = potDemanda / (Math.sqrt(3) * 220);
                    tipoDisjuntorTexto = "Trifásico (Tripolar)";
                } else if (redeCalculada === 'bifasico') {
                    ibInstalado = potDemanda / 220; 
                    tipoDisjuntorTexto = "Bifásico (Bipolar)";
                } else {
                    ibInstalado = potDemanda / tensao;
                    tipoDisjuntorTexto = "Monofásico (Unipolar)";
                }

                let djGeral = disjuntoresPadrao[0];
                for (let d of disjuntoresPadrao) {
                    if (d >= ibInstalado) { djGeral = d; break; }
                }

                const col = (redeCalculada === 'trifasico') ? 'amp3' : 'amp2';
                let caboGeral = tabelaCabosNBR.find(c => c[col] >= djGeral) || tabelaCabosNBR[tabelaCabosNBR.length - 1];

                let listaCircuitos = [];
                circuitosCustomizados.forEach(c => {
                    listaCircuitos.push(dimensionarCircuitoUnico(c.nome, c.potencia, c.tensao, distancia, false));
                });

                const totalDisjuntores = listaCircuitos.length + 1;

                let htmlCircuitos = "";
                listaCircuitos.forEach((c, idx) => {
                    htmlCircuitos += `
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 8px;"><strong>C${idx+1}:</strong> ${c.nome}</td>
                            <td style="padding: 8px;">${c.potenciaW} W</td>
                            <td style="padding: 8px;">${c.ib.toFixed(1)} A</td>
                            <td style="padding: 8px; color: #2563eb; font-weight:bold;">${c.disjuntor} A</td>
                            <td style="padding: 8px; color: #166534; font-weight:bold;">${c.caboSecao} mm²</td>
                            <td style="padding: 8px;">${c.quedaPct.toFixed(1)}%</td>
                        </tr>
                    `;
                });

                resDiv.innerHTML = `
                    <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 8px;">
                        <h3 style="color: #0b132b; margin-bottom: 12px;"><i class="fa-solid fa-house-bolt"></i> Dimensionamento de Entrada Residencial & Quadro</h3>
                        
                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 6px; margin-bottom: 15px; color: #1e40af;">
                            <strong><i class="fa-solid fa-lightbulb"></i> Sugestão de Tipo de Ligação:</strong> ${sugestaoRede}
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 15px;">
                            <div><strong>Potência Instalada:</strong> ${(potTotalInstalada/1000).toFixed(2)} kW</div>
                            <div><strong>Potência Calculada (Demanda):</strong> ${(potDemanda/1000).toFixed(2)} kW</div>
                            <div><strong>Fator de Demanda:</strong> ${(fd*100).toFixed(0)}%</div>
                            <div><strong>Corrente por Fase (Demanda):</strong> <span style="color:#d97706; font-weight:bold;">${ibInstalado.toFixed(1)} A</span></div>
                            <div><strong>Disjuntor Geral (QDF):</strong> <span style="color:#2563eb; font-weight:bold;">Disjuntor ${tipoDisjuntorTexto} de ${djGeral} A</span></div>
                            <div><strong>Cabo de Entrada (Alimentador):</strong> <span style="color:#166534; font-weight:bold;">${caboGeral.secao} mm²</span></div>
                        </div>

                        <h4 style="color: #1e293b; margin-top: 15px; margin-bottom: 10px;">
                            <i class="fa-solid fa-list-check"></i> Detalhamento do Quadro de Distribuição (Total: ${totalDisjuntores} Disjuntores)
                        </h4>
                        
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; text-align: left; border-collapse: collapse; font-size: 0.9rem; background: white; border-radius: 6px; overflow: hidden; border: 1px solid #cbd5e1;">
                                <thead style="background: #0b132b; color: white;">
                                    <tr>
                                        <th style="padding: 8px;">Circuito</th>
                                        <th style="padding: 8px;">Potência</th>
                                        <th style="padding: 8px;">Corrente (Ib)</th>
                                        <th style="padding: 8px;">Disjuntor</th>
                                        <th style="padding: 8px;">Cabo Rec.</th>
                                        <th style="padding: 8px;">Queda (ΔV)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${htmlCircuitos}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            } else {
                let potenciaInstalada = 0;
                if (tipo === 'ar') {
                    let btu = parseFloat(document.getElementById('inputBtus').value) || 0;
                    potenciaInstalada = btuParaWatts(btu);
                } else {
                    potenciaInstalada = parseFloat(document.getElementById('potenciaWatts').value) || 0;
                }
                
                let ehTrifasico = (rede === 'trifasico');
                let resCircuito = dimensionarCircuitoUnico("Equipamento / Circuito", potenciaInstalada, tensao, distancia, ehTrifasico);
                let tipoDjUnico = ehTrifasico ? 'Trifásico (Tripolar)' : (rede === 'bifasico' ? 'Bifásico (Bipolar)' : 'Monofásico (Unipolar)');

                resDiv.innerHTML = `
                    <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 8px;">
                        <h3 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-file-contract"></i> Relatório de Circuito Único</h3>
                        • <strong>Corrente Nominal (Ib):</strong> <span style="color:#d97706; font-weight:bold;">${resCircuito.ib.toFixed(1)} A</span><br>
                        • <strong>Disjuntor Sugerido (In):</strong> <span style="color:#2563eb; font-weight:bold;">Disjuntor ${tipoDjUnico} de ${resCircuito.disjuntor} A</span> (Curva C)<br>
                        • <strong>Cabo Recomendado:</strong> <span style="color:#166534; font-weight:bold;">${resCircuito.caboSecao} mm²</span> (Distância: ${distancia}m)<br>
                        • <strong>Ampacidade do Cabo (Iz):</strong> Suporta até ${resCircuito.ampacidadeIz} A em eletroduto<br>
                        • <strong>Queda de Tensão (ΔV):</strong> ${resCircuito.quedaPct.toFixed(2)}% ${resCircuito.quedaPct > 4 ? '<span style="color:red;">⚠️ Excede 4%! Bitola aumentada.</span>' : '<span style="color:green;">✓ Dentro do limite NBR 5410 (&le;4%)</span>'}<br>
                    </div>
                `;
            }
        });
    }
});