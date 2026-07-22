function carregarEnciclopediaTecnica() {
    const container = document.getElementById('conteudoEnciclopediaContainer');
    if (!container) return;

    container.innerHTML = `
        <!-- SEÇÃO 1: COMO FUNCIONAM OS DISJUNTORES E SUAS MARCAÇÕES -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-car-battery"></i> O Funcionamento e as Marcações dos Disjuntores (Termomagnéticos)</h3>
            <p style="font-size: 0.9rem; color: #475569; margin-bottom: 12px;">
                O disjuntor não é apenas um "interruptor automático". Ele possui dois mecanismos internos de proteção distintos:
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h5 style="color: #1e293b; margin-bottom: 4px;"><i class="fa-solid fa-fire"></i> Disparo Térmico (Sobrecarga Lenta)</h5>
                    <p style="font-size: 0.85rem; color: #334155;">Feito por uma <strong>lâmina bimetálica</strong>. Se passarmos uma corrente um pouco acima do limite por muito tempo (ex: ligar muitos aparelhos juntos), a lâmina aquece, entorta e desliga o circuito. Protege o <em>cabo</em> contra derretimento.</p>
                </div>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h5 style="color: #1e293b; margin-bottom: 4px;"><i class="fa-solid fa-bolt"></i> Disparo Magnético (Curto-Circuito Instantâneo)</h5>
                    <p style="font-size: 0.85rem; color: #334155;">Feito por uma <strong>bobina eletromagnética</strong>. Em caso de curto-circuito franco, a corrente dispara violentamente gerando um campo magnético instantâneo que puxa um pino e desliga em frações de milissegundo.</p>
                </div>
            </div>

            <h4 style="color: #0b132b; margin-top: 15px; margin-bottom: 8px;">Entendendo as Marcações no Corpo do Disjuntor:</h4>
            <ul style="font-size: 0.9rem; color: #334155; padding-left: 20px; line-height: 1.6;">
                <li><strong>In (Corrente Nominal):</strong> O número impresso seguido de 'A' (ex: <span style="color:#2563eb; font-weight:bold;">C25</span> significa Curva C, 25 Ampères). É a corrente máxima que ele suporta conduzir continuamente sem disparar.</li>
                <li><strong>A Curva (B, C ou D):</strong> Determina a tolerância ao pico de corrente de partida (inércia):
                    <ul style="margin-top: 4px; padding-left: 20px;">
                        <li><strong>Curva B (3 a 5 x In):</strong> Dispara rápido. Para cargas resistivas (chuveiro, ferro de passar, lâmpadas). Dispararia com o tranco de um motor.</li>
                        <li><strong>Curva C (5 a 10 x In):</strong> Padrão residencial/comercial. Tolera o tranco de motores médios (bombas, geladeiras, ar-condicionado).</li>
                        <li><strong>Curva D (10 a 20 x In):</strong> Industrial pesada. Tolera picos monstruosos de transformadores e grandes motores.</li>
                    </ul>
                </li>
                <li><strong>Capacidade de Interrupção (Ex: 4500 ou kA):</strong> O quadrado com um número (ex: <code>4500</code> ou <code>3kA</code>). Indica a máxima corrente de curto que o disjuntor consegue extinguir sem explodir na sua mão.</li>
            </ul>
        </div>

        <!-- SEÇÃO 2: GUIA DE TENSÕES E 380V -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-network-wired"></i> Entendendo Redes: 127V, 220V e 380V (Fase, Neutro e Terra)</h3>
            <p style="font-size: 0.9rem; color: #475569; margin-bottom: 12px;">
                A forma como a energia chega ao quadro muda completamente o dimensionamento e as proteções:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 15px;">
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #2563eb; margin-bottom: 6px;">Monofásico / Bifásico (127V / 220V)</h4>
                    <p style="font-size: 0.88rem; color: #334155;">Derivado de transformadores abaixadores de distribuição urbana. 
                    <br>• <strong>Fase + Neutro =</strong> 127V
                    <br>• <strong>Fase + Fase =</strong> 220V (em redes bifásicas a 127/220V)</p>
                </div>
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #166534; margin-bottom: 6px;">Trifásico 380V / 220V (Estrela / Y)</h4>
                    <p style="font-size: 0.88rem; color: #334155;">Muito comum em indústrias e prédios comerciais. Possui 3 Fases vivas (L1, L2, L3) + Neutro central + Terra.
                    <br>• <strong>Entre qualquer Fase e o Neutro =</strong> 220V
                    <br>• <strong>Entre Fase e Fase (L1 a L2) =</strong> 380V (usado para motores industriais potentes)</p>
                </div>
            </div>
        </div>

        <!-- SEÇÃO 3: GUIA INTERATIVO DE LIGAÇÕES PRÁTICAS -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; border-left: 5px solid #166534;">
            <h3 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-screwdriver-wrench"></i> Guia Interativo de Montagem & Bornes de Comando</h3>
            <p style="font-size: 0.9rem; color: #475569; margin-bottom: 15px;">
                Selecione abaixo o que você deseja montar para ver o diagrama exato de onde ligar cada fio e borne:
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div>
                    <label style="font-size:0.85rem; font-weight:bold;">Tensão do Sistema:</label>
                    <select id="guiaTensao" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:4px; margin-top:4px;">
                        <option value="220">220V (Fase + Fase ou Fase + Neutro)</option>
                        <option value="380">380V (Trifásico - Fase + Fase)</option>
                        <option value="24v">24V DC (Comando Eletrônico / CLP)</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:0.85rem; font-weight:bold;">Aplicação Desejada:</label>
                    <select id="guiaAplicacao" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:4px; margin-top:4px;" onchange="renderizarGuiaPratico()">
                        <option value="partida_direta">Partida Direta de Motor Trifásico (Contatora + Botoeira)</option>
                        <option value="idr_instalacao">Instalação de IDR / DR Residencial</option>
                        <option value="tomada_chuveiro">Ligação de Chuveiro / Carga Resistiva</option>
                    </select>
                </div>
            </div>

            <div id="resultadoGuiaPratico" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 6px;">
                <!-- Injetado dinamicamente -->
            </div>
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
            <h4 style="color: #1e293b; margin-bottom: 8px;"><i class="fa-solid fa-gears"></i> Esquema de Ligações: Partida Direta (${tensao === '380' ? '380V Trifásico' : '220V'})</h4>
            <div style="font-size: 0.88rem; color: #334155; line-height: 1.6;">
                <p><strong>1. Circuito de Potência (Força):</strong></p>
                <ul style="padding-left: 20px; margin-bottom: 10px;">
                    <li>Ligue as Fases da rede (R, S, T) nos bornes superiores do Disjuntor Geral/Motor.</li>
                    <li>Saia do disjuntor e ligue nos bornes de entrada da Contatora principais: <strong>L1, L2 e L3</strong>.</li>
                    <li>Saia da contatora pelos bornes inferiores de potência: <strong>T1, T2 e T3</strong>.</li>
                    <li>Ligue esses cabos direto nos bornes de entrada do <strong>Relé de Sobrecarga</strong> (geralmente se acopla direto na contatora).</li>
                    <li>Saia do Relé de Sobrecarga (terminais 2T1, 4T2, 6T3) e leve os cabos até o motor fechado em ${tensao}V.</li>
                </ul>

                <p><strong>2. Circuito de Comando (Acionamento):</strong></p>
                <ul style="padding-left: 20px;">
                    <li>Puxe uma Fase (ou 24V+) para alimentar a <strong>Botoeira Desliga (NF - Terminais 1 e 2)</strong>.</li>
                    <li>Saia do borne 2 da botoeira desliga e ligue na <strong>Botoeira Liga (NA - Terminais 3 e 4)</strong>.</li>
                    <li>Faça o <strong>Selo</strong>: Puxe um fio do borne de saída da botoeira liga e ligue no contato auxiliar <strong>13 e 14 (NO)</strong> da própria contatora.</li>
                    <li>Ligue o sinal final na entrada da bobina da contatora: <strong>A1</strong>.</li>
                    <li>Feche o circuito da bobina ligando o borne <strong>A2</strong> no Neutro (ou na segunda Fase / 0V).</li>
                </ul>
            </div>
        `;
    } else if (app === 'idr_instalacao') {
        resDiv.innerHTML = `
            <h4 style="color: #1e293b; margin-bottom: 8px;"><i class="fa-solid fa-shield-halved"></i> Como Instalar o IDR / DR Corretamente</h4>
            <div style="font-size: 0.88rem; color: #334155; line-height: 1.6;">
                <p>• <strong>Alimentação Superior (Entrada):</strong> Os cabos que vêm do disjuntor geral entram nos bornes superiores do IDR (Fases à esquerda e o <strong>Neutro</strong> obrigatoriamente no borne identificado com a letra <strong>N</strong>).</p>
                <p>• <strong>Saída Inferior:</strong> Sai do IDR por baixo e alimenta os disjuntores parciais dos circuitos protegidos.</p>
                <p style="color: #dc2626; margin-top: 6px;">⚠️ <strong>Regra de Ouro:</strong> Nunca misture ou aterre o Neutro após a saída do IDR. O IDR mede a corrente que vai e que volta pelo Neutro; se houver fuga para o terra ou toque humano, a corrente de retorno diminui e ele dispara na hora!</p>
            </div>
        `;
    } else {
        resDiv.innerHTML = `
            <h4 style="color: #1e293b; margin-bottom: 8px;"><i class="fa-solid fa-bolt"></i> Ligação de Cargas Resistivas (Chuveiro / Torneira)</h4>
            <div style="font-size: 0.88rem; color: #334155; line-height: 1.6;">
                <p>• Para redes em <strong>220V</strong>, utilize um disjuntor Bipolar dedicado com cabo de <strong>6.0 mm²</strong>.</p>
                <p>• Conecte os dois cabos de fase do aparelho diretamente nos terminais de saída do disjuntor e do neutro/terra conforme o manual.</p>
                <p style="color: #166534; font-weight: bold; margin-top: 6px;">✓ O fio de Proteção (Terra - cor verde ou verde-amarelo) deve ser ligado obrigatoriamente ao borne de aterramento do chuveiro para evitar qualquer risco de choque.</p>
            </div>
        `;
    }
}
