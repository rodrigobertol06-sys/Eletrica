function carregarEnciclopediaTecnica() {
    const container = document.getElementById('conteudoEnciclopediaContainer');
    if (!container) return;

    container.innerHTML = `
        <!-- SEÇÃO 1: DISJUNTORES -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0b132b; margin-top: 0; font-size: 1.05rem;"><i class="fa-solid fa-car-battery"></i> O Funcionamento e as Marcações dos Disjuntores</h3>
            <p style="font-size: 0.88rem; color: #475569; margin-bottom: 12px;">
                Os disjuntores termomagnéticos possuem duas proteções em uma única peça:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-bottom: 15px;">
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h5 style="color: #1e293b; margin: 0 0 6px 0;"><i class="fa-solid fa-fire"></i> Térmico (Sobrecarga)</h5>
                    <p style="font-size: 0.82rem; color: #334155; margin: 0;">Lâmina bimetálica que deforma e desarma com aquecimento lento por excesso de carga contínua.</p>
                </div>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h5 style="color: #1e293b; margin: 0 0 6px 0;"><i class="fa-solid fa-bolt"></i> Magnético (Curto-circuito)</h5>
                    <p style="font-size: 0.82rem; color: #334155; margin: 0;">Bobina eletromagnética que desarma instantaneamente (milissegundos) em picos de curto franco.</p>
                </div>
            </div>
            <ul style="font-size: 0.88rem; color: #334155; padding-left: 20px; line-height: 1.5; margin: 0;">
                <li><strong>In (Corrente Nominal):</strong> Corrente máxima suportada sem desarmar (ex: <code>C25</code> = Curva C, 25A).</li>
                <li><strong>Curva C:</strong> Padrão para residências e motores de médio porte (tolera de 5 a 10 vezes a corrente nominal na partida).</li>
            </ul>
        </div>

        <!-- SEÇÃO 2: GUIA DE LIGAÇÕES PRÁTICAS -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; border-left: 5px solid #166534;">
            <h3 style="color: #0b132b; margin-top: 0; font-size: 1.05rem;"><i class="fa-solid fa-screwdriver-wrench"></i> Guia Prático de Bornes & Montagens</h3>
            <p style="font-size: 0.88rem; color: #475569; margin-bottom: 15px;">
                Selecione o tipo de aplicação para visualizar o esquema de montagem detalhado:
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 15px;">
                <div>
                    <label style="font-size:0.82rem; font-weight:bold;">Sistema:</label>
                    <select id="guiaTensao" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:4px; margin-top:4px;">
                        <option value="220">220V</option>
                        <option value="380">380V (Trifásico)</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:0.82rem; font-weight:bold;">Aplicação:</label>
                    <select id="guiaAplicacao" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:4px; margin-top:4px;" onchange="renderizarGuiaPratico()">
                        <option value="partida_direta">Partida Direta de Motor (Contatora + Botoeira)</option>
                        <option value="idr_instalacao">Instalação de IDR / DR Residencial</option>
                        <option value="chuveiro">Chuveiro / Carga Resistiva</option>
                    </select>
                </div>
            </div>

            <div id="resultadoGuiaPratico" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 6px;"></div>
        </div>
    `;

    renderizarGuiaPratico();
    document.getElementById('guiaAplicacao').addEventListener('change', renderizarGuiaPratico);
    document.getElementById('guiaTensao').addEventListener('change', renderizarGuiaPratico);
}

function renderizarGuiaPratico() {
    const app = document.getElementById('guiaAplicacao').value;
    const tensao = document.getElementById('guiaTensao').value;
    const resDiv = document.getElementById('resultadoGuiaPratico');
    if (!resDiv) return;

    if (app === 'partida_direta') {
        resDiv.innerHTML = `
            <h4 style="color: #1e293b; margin-top: 0; font-size: 0.95rem;"><i class="fa-solid fa-gears"></i> Partida Direta (${tensao}V)</h4>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
                <p><strong>Potência:</strong> Conecte as Fases da rede nos bornes <strong>L1, L2 e L3</strong> da contatora. Saia por <strong>T1, T2 e T3</strong> em direção ao Relé Térmico e ao motor.</p>
                <p><strong>Comando:</strong> Alimente a botoeira Desliga (NF) e ligue a saída dela na botoeira Liga (NA). Faça o selo no contato auxiliar <strong>13 e 14</strong> da contatora e feche a bobina em <strong>A1</strong> (Fase) e <strong>A2</strong> (Neutro/24V).</p>
            </div>
        `;
    } else if (app === 'idr_instalacao') {
        resDiv.innerHTML = `
            <h4 style="color: #1e293b; margin-top: 0; font-size: 0.95rem;"><i class="fa-solid fa-shield-halved"></i> Instalação correta de IDR</h4>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
                <p>• A entrada superior recebe as Fases e o <strong>Neutro</strong> (que deve ser conectado obrigatoriamente no borne identificado com a letra <strong>N</strong>).</p>
                <p style="color: #dc2626; margin-top: 4px;">⚠️ Nunca aterre o Neutro após a saída do IDR, sob risco de desarmes indesejados.</p>
            </div>
        `;
    } else {
        resDiv.innerHTML = `
            <h4 style="color: #1e293b; margin-top: 0; font-size: 0.95rem;"><i class="fa-solid fa-bolt"></i> Ligação de Chuveiro / Cargas Resistivas</h4>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
                <p>• Utilize disjuntor bipolar adequado com cabos mínimos de <strong>6.0 mm²</strong> em redes de 220V.</p>
                <p>• Conecte sempre o fio de Proteção (Terra) ao borne correspondente do aparelho.</p>
            </div>
        `;
    }
}
