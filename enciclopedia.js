function carregarEnciclopediaTecnica() {
    const container = document.getElementById('conteudoEnciclopediaContainer');
    if (!container) return;

    container.innerHTML = `
        <!-- SEÇÃO 1: GUIA DE CABOS E POTÊNCIAS (COM MARGEM DE SEGURANÇA) -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-table-cells"></i> Tabela Prática de Cabos, Ampacidade & Margem de Segurança</h3>
            <p style="font-size: 0.9rem; color: #475569; margin-bottom: 15px;">
                Conforme a NBR 5410, os condutores devem possuir capacidade de condução de corrente (Iz) superior à corrente do circuito (Ib) e inferior à proteção do disjuntor (In). A tabela abaixo considera uma <strong>margem de segurança operacional</strong> para cabos em eletrodutos embutidos (Método B1), exibindo a capacidade máxima de corrente e potências limites aproximadas em 127V e 220V:
            </p>
            
            <div style="overflow-x: auto;">
                <table style="width: 100%; text-align: left; border-collapse: collapse; font-size: 0.88rem; background: white; border-radius: 6px; overflow: hidden; border: 1px solid #cbd5e1;">
                    <thead style="background: #0b132b; color: white;">
                        <tr>
                            <th style="padding: 10px;">Bitola (mm²)</th>
                            <th style="padding: 10px;">Corrente Máx (Iz)*</th>
                            <th style="padding: 10px;">Potência Máx (127V)</th>
                            <th style="padding: 10px;">Potência Máx (220V)</th>
                            <th style="padding: 10px;">Uso Típico Recomendado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 9px; font-weight:bold; color:#166534;">1.5 mm²</td>
                            <td style="padding: 9px;">15.5 A</td>
                            <td style="padding: 9px;">~1.9 kW</td>
                            <td style="padding: 9px;">~3.4 kW</td>
                            <td style="padding: 9px;">Circuitos de Iluminação exclusivos.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 9px; font-weight:bold; color:#166534;">2.5 mm²</td>
                            <td style="padding: 9px;">21.0 A</td>
                            <td style="padding: 9px;">~2.6 kW</td>
                            <td style="padding: 9px;">~4.6 kW</td>
                            <td style="padding: 9px;">Tomadas Gerais (TUGs), Geladeira, Micro-ondas.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 9px; font-weight:bold; color:#166534;">4.0 mm²</td>
                            <td style="padding: 9px;">28.0 A</td>
                            <td style="padding: 9px;">~3.5 kW</td>
                            <td style="padding: 9px;">~6.1 kW</td>
                            <td style="padding: 9px;">Tomadas de Uso Específico (TUE), Torneiras elétricas menores.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 9px; font-weight:bold; color:#166534;">6.0 mm²</td>
                            <td style="padding: 9px;">36.0 A</td>
                            <td style="padding: 9px;">~4.5 kW</td>
                            <td style="padding: 9px;">~7.9 kW</td>
                            <td style="padding: 9px;">Chuveiros, Fornos embutidos, Ar-condicionado potente.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 9px; font-weight:bold; color:#166534;">10.0 mm²</td>
                            <td style="padding: 9px;">50.0 A</td>
                            <td style="padding: 9px;">-</td>
                            <td style="padding: 9px;">~11.0 kW</td>
                            <td style="padding: 9px;">Alimentadores principais de subquadros / Residências pequenas.</td>
                        </tr>
                        <tr>
                            <td style="padding: 9px; font-weight:bold; color:#166534;">16.0 mm²</td>
                            <td style="padding: 9px;">68.0 A</td>
                            <td style="padding: 9px;">-</td>
                            <td style="padding: 9px;">~14.9 kW</td>
                            <td style="padding: 9px;">Entradas e alimentadores principais de residências médias.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="font-size: 0.8rem; color: #64748b; margin-top: 8px;">*Valores com margem baseada nas condições padrão de agrupamento de circuitos da NBR 5410.</p>
        </div>

        <!-- SEÇÃO 2: TIPOS DE DISJUNTORES E CURVAS -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-car-battery"></i> Tipos de Disjuntores e suas Curvas de Disparo</h3>
            <p style="font-size: 0.9rem; color: #475569; margin-bottom: 12px;">
                O disjuntor protege a instalação contra curtos-circuitos e sobrecargas. A "Curva" define a sensibilidade ao pico de corrente no momento da partida de motores e equipamentos indutivos:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 15px;">
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #2563eb; margin-bottom: 6px;">Curva B (3 a 5 x In)</h4>
                    <p style="font-size: 0.88rem; color: #334155;">Disparo rápido em caso de sobrecorrentes leves. Ideal para cargas puramente resistivas (chuveiros, lâmpadas incandescentes, aquecedores e tomadas comuns residenciais).</p>
                </div>
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #166534; margin-bottom: 6px;">Curva C (5 a 10 x In)</h4>
                    <p style="font-size: 0.88rem; color: #334155;"><strong>O mais utilizado em residências e indústrias leves.</strong> Tolera picos de corrente moderados no momento de ligar motores (bombas, geladeiras, ar-condicionado inverter e ferramentas elétricas).</p>
                </div>
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #d97706; margin-bottom: 6px;">Curva D (10 a 20 x In)</h4>
                    <p style="font-size: 0.88rem; color: #334155;">Altamente tolerante a picos de partida. Destinado a cargas altamente indutivas, como grandes transformadores, máquinas de solda e motores industriais pesados.</p>
                </div>
            </div>
        </div>

        <!-- SEÇÃO 3: DPS E IDR / DR -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px;">
            <h3 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-shield-halved"></i> Proteção Diferencial (IDR/DR) e Surtos (DPS)</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: #eff6ff; padding: 15px; border-radius: 6px; border: 1px solid #bfdbfe;">
                    <h4 style="color: #1e40af; margin-bottom: 8px;"><i class="fa-solid fa-user-shield"></i> IDR / DR (Dispositivo Diferencial Residual)</h4>
                    <p style="font-size: 0.88rem; color: #1e3a8a; margin-bottom: 8px;"><strong>O que faz:</strong> Protege contra choques elétricos letais por contato direto ou indireto, monitorando a fuga de corrente para a terra.</p>
                    <p style="font-size: 0.88rem; color: #1e3a8a;"><strong>Onde e quando usar:</strong> Obrigatório pela NBR 5410 em áreas molhadas ou externas (banheiros, cozinhas, lavanderias e tomadas externas). Sensibilidade padrão: 30mA para proteção de pessoas.</p>
                </div>
                <div style="background: #fef2f2; padding: 15px; border-radius: 6px; border: 1px solid #fecaca;">
                    <h4 style="color: #991b1b; margin-bottom: 8px;"><i class="fa-solid fa-bolt-lightning"></i> DPS (Dispositivo de Proteção contra Surtos)</h4>
                    <p style="font-size: 0.88rem; color: #7f1d1d; margin-bottom: 8px;"><strong>O que faz:</strong> Desvia para o aterramento os surtos de tensão transitórios causados por descargas atmosféricas (raios) na rede elétrica ou manobras da concessionária.</p>
                    <p style="font-size: 0.88rem; color: #7f1d1d;"><strong>Onde e quando usar:</strong> Obrigatório no Quadro de Distribuição Principal (QDF) de edificações alimentadas por rede aérea ou regiões com incidência de raios.</p>
                </div>
            </div>
        </div>

        <!-- SEÇÃO 4: SOPA DE LETRINHAS DE COMANDOS -->
        <div class="bloco-tecnico" style="background: white; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 5px solid var(--accent);">
            <h4 style="color: #0b132b; margin-bottom: 10px;"><i class="fa-solid fa-language"></i> A "Sopa de Letrinhas" de Comandos Elétricos</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px; font-size: 0.9rem;">
                <div>
                    <p><strong>A1 e A2 (Bobina):</strong> Eletroímã do contator. Recebe o sinal de comando (ex: 24VDC ou 220V) para atracar.</p>
                    <p style="margin-top: 8px;"><strong>L1, L2, L3 (Line):</strong> Entrada de potência principal (fases da rede).</p>
                    <p style="margin-top: 8px;"><strong>T1, T2, T3 (Terminal):</strong> Saída de potência que vai direto para a carga pesada (motor).</p>
                </div>
                <div>
                    <p><strong>NA / NO (Normalmente Aberto):</strong> Terminais 3 e 4. Fecham o contato quando a bobina é energizada (usado em selo e sinaleiros verdes).</p>
                    <p style="margin-top: 8px;"><strong>NF / NC (Normalmente Fechado):</strong> Terminais 1 e 2. Abrem o contato quando a bobina é energizada (usado em intertravamento e sinaleiros vermelhos).</p>
                </div>
            </div>
        </div>
    `;
}