function carregarEnciclopediaTecnica() {
    const container = document.getElementById('conteudoEnciclopediaContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="card">
            <h3 style="color: var(--primary); margin-top: 0; font-size: 1.05rem;"><i class="fa-solid fa-book"></i> Enciclopédia Técnica & Normas NBR 5410</h3>
            <p style="font-size: 0.88rem; color: #475569; margin-bottom: 12px;">
                Guia prático de referência rápida para eletricistas e programadores de automação industrial/residencial.
            </p>
            <div class="grid-3" style="margin-bottom: 15px;">
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h5 style="color: var(--text-main); margin: 0 0 6px 0;"><i class="fa-solid fa-fire"></i> Disjuntores Curva C</h5>
                    <p style="font-size: 0.82rem; color: #334155; margin: 0;">Disparam entre 5 a 10 vezes a corrente nominal. Padrão para cargas indutivas residenciais e motores.</p>
                </div>
                <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h5 style="color: var(--text-main); margin: 0 0 6px 0;"><i class="fa-solid fa-shield-halved"></i> Proteção IDR (30mA)</h5>
                    <p style="font-size: 0.82rem; color: #334155; margin: 0;">Obrigatório em áreas molhadas contra choques elétricos por contato direto ou indireto.</p>
                </div>
            </div>
        </div>

        <div class="card" style="border-left: 5px solid var(--success);">
            <h3 style="color: var(--primary); margin-top: 0; font-size: 1.05rem;"><i class="fa-solid fa-screwdriver-wrench"></i> Guia Prático de Ligações & Bornes</h3>
            <div class="grid-3" style="margin-bottom: 15px;">
                <div>
                    <label>Sistema de Tensão:</label>
                    <select id="guiaTensao">
                        <option value="220">220V</option>
                        <option value="380">380V (Trifásico)</option>
                    </select>
                </div>
                <div>
                    <label>Aplicação Prática:</label>
                    <select id="guiaAplicacao" onchange="renderizarGuiaPratico()">
                        <option value="partida_direta">Partida Direta de Motor (Contatora + Botoeira)</option>
                        <option value="idr_instalacao">Instalação de IDR / DR Residencial</option>
                        <option value="chuveiro">Chuveiro / Cargas Resistivas</option>
                    </select>
                </div>
            </div>
            <div id="resultadoGuiaPratico" style="background: #f8fafc; border: 1px solid var(--border); padding: 15px; border-radius: 6px;"></div>
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
            <h4 style="color: var(--text-main); margin-top: 0; font-size: 0.95rem;"><i class="fa-solid fa-gears"></i> Esquema de Partida Direta (${tensao}V)</h4>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
                <p><strong>Força:</strong> Alimente as Fases nos bornes <strong>L1, L2 e L3</strong> da contatora principal. Saia por <strong>T1, T2 e T3</strong> para o Relé Térmico e finalize no motor.</p>
                <p><strong>Comando:</strong> Passe a fase pela botoeira Desliga (NF), entre na botoeira Liga (NA), faça o selo elétrico no contato auxiliar <strong>13 e 14</strong> da contatora e alimente a bobina em <strong>A1</strong> (Fase) e <strong>A2</strong> (Neutro).</p>
            </div>
        `;
    } else if (app === 'idr_instalacao') {
        resDiv.innerHTML = `
            <h4 style="color: var(--text-main); margin-top: 0; font-size: 0.95rem;"><i class="fa-solid fa-shield-halved"></i> Padrão de Ligação do IDR</h4>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
                <p>• Conecte as fases e o <strong>Neutro</strong> na parte superior. O borne do Neutro possui marcação explícita com a letra <strong>N</strong>.</p>
                <p style="color: #dc2626; margin-top: 4px;">⚠️ Nunca faça jumper ou união do cabo de Proteção (Terra) com o Neutro após a saída do IDR.</p>
            </div>
        `;
    } else {
        resDiv.innerHTML = `
            <h4 style="color: var(--text-main); margin-top: 0; font-size: 0.95rem;"><i class="fa-solid fa-bolt"></i> Recomendações para Chuveiros e Torneiras</h4>
            <div style="font-size: 0.85rem; color: #334155; line-height: 1.5;">
                <p>• Utilize sempre cabo antichama isolado de no mínimo <strong>6.0 mm²</strong> para 220V com disjuntor bipolar dedicado.</p>
                <p>• Garanta conexão firme com conectores de boa qualidade para evitar pontos de aquecimento e mau contato.</p>
            </div>
        `;
    }
}
