document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');
    
    if (menuToggle && menuList) {
        menuToggle.addEventListener('click', () => {
            menuList.classList.toggle('active');
        });
    }

    const btnProcessar = document.getElementById('btn-processar');
    const inputsFormulario = document.querySelectorAll('#form-regulamentacao input, #form-regulamentacao select, #modelo-drone, #data-missao, #consumo-drone, #bateria-drone, #decolagem-hora, #duracao-voo, #vel-drone, #vel-vento, #angulo-vento');

    if (btnProcessar) {
        btnProcessar.addEventListener('click', () => {
            processarPlanoDeVoo();
            destacarPainelResultado();
        });
    }

    inputsFormulario.forEach(elemento => {
        elemento.addEventListener('input', processarPlanoDeVoo);
        elemento.addEventListener('change', processarPlanoDeVoo);
    });

    if (document.getElementById('modelo-drone')) {
        processarPlanoDeVoo();
    }
});

function destacarPainelResultado() {
    const resultadoDiv = document.getElementById('resultado-calculo');
    if (!resultadoDiv) return;

    resultadoDiv.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
    resultadoDiv.style.backgroundColor = '#e0f2fe';
    resultadoDiv.style.transform = 'scale(1.01)';

    setTimeout(() => {
        resultadoDiv.style.backgroundColor = 'transparent';
        resultadoDiv.style.transform = 'scale(1)';
    }, 400);
}

function processarPlanoDeVoo() {
    const selectModelo = document.getElementById('modelo-drone');
    const modelo = selectModelo && selectModelo.value ? selectModelo.options[selectModelo.selectedIndex].text : 'Modelo Genérico / Personalizado';
    const dataMissaoInput = document.getElementById('data-missao');
    
    let dataFormatada = 'Não informada';
    if (dataMissaoInput && dataMissaoInput.value) {
        const partes = dataMissaoInput.value.split('-');
        if (partes.length === 3) {
            dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
    }

    const consumoElem = document.getElementById('consumo-drone');
    const bateriaElem = document.getElementById('bateria-drone');
    const horaDecolagemElem = document.getElementById('decolagem-hora');
    const duracaoElem = document.getElementById('duracao-voo');
    const velVentoElem = document.getElementById('vel-vento');
    const anguloVentoElem = document.getElementById('angulo-vento');

    const consumo = consumoElem ? parseFloat(consumoElem.value) || 0 : 0;
    const bateria = bateriaElem ? parseFloat(bateriaElem.value) || 0 : 0;
    const horaDecolagem = horaDecolagemElem ? horaDecolagemElem.value : '';
    const duracao = duracaoElem ? parseFloat(duracaoElem.value) || 0 : 0;
    const velVento = velVentoElem ? parseFloat(velVentoElem.value) || 0 : 0;
    const anguloVento = anguloVentoElem ? parseFloat(anguloVentoElem.value) || 0 : 0;
    
    const resultadoDiv = document.getElementById('resultado-calculo');
    if (!resultadoDiv) return;

    const consumoTotalEstimado = consumo * duracao;
    const autonomiaMaximaMinutos = consumo > 0 ? (bateria / consumo).toFixed(1) : 0;
    const ventoKmh = (velVento * 3.6).toFixed(1);

    let statusSeguranca = 'Aprovado para operação diurna padrão';
    let classeStatus = 'status-ok';
    let alertaNoturno = '';

    if (horaDecolagem) {
        const [horas, minutos] = horaDecolagem.split(':').map(Number);
        const totalMinutosDecolagem = horas * 60 + minutos;
        const limiteNoiteMinutos = 18 * 60;

        if (totalMinutosDecolagem >= limiteNoiteMinutos || totalMinutosDecolagem < 6 * 60) {
            alertaNoturno = '<br><span class="alerta-noturno">Alerta Regulatório: Horário de operação noturna. Requer autorização especial e adequação às regras do DECEA/ANAC para voos BVLOS/Noturnos.</span>';
        }
    }

    if (consumoTotalEstimado > (bateria * 0.8)) {
        statusSeguranca = 'Alerta: Consumo próximo ou superior a 80% da carga da bateria!';
        classeStatus = 'status-alerta';
    }

    if (velVento > 10.7) {
        statusSeguranca = 'Reprovado: Velocidade do vento acima do limite seguro para operação!';
        classeStatus = 'status-erro';
    }

    resultadoDiv.innerHTML = `
        <div class="resultado-flex">
            <p><strong>Modelo Selecionado:</strong> ${modelo}</p>
            <p><strong>Data da Missão:</strong> ${dataFormatada}</p>
            <p><strong>Horário de Decolagem:</strong> ${horaDecolagem || 'Não informado'}</p>
            <p><strong>Autonomia Estimada:</strong> ${autonomiaMaximaMinutos} minutos</p>
            <p><strong>Consumo Estimado do Voo:</strong> ${consumoTotalEstimado} mAh</p>
            <p><strong>Vento Registrado:</strong> ${velVento} m/s (${ventoKmh} km/h) a ${anguloVento}°</p>
            <p class="${classeStatus}">Status: ${statusSeguranca}</p>
            ${alertaNoturno}
        </div>
    `;
}

function validarRegulamentacao() {
    const tipoPessoa = document.getElementById('tipo-pessoa').value;
    const serialNumber = document.getElementById('serial-number').value;
    const pmd = parseFloat(document.getElementById('pmd').value);
    const finalidade = document.getElementById('finalidade').value;
    const painel = document.getElementById('resultado-regulamentacao');

    if (!serialNumber || isNaN(pmd)) {
        painel.innerHTML = '<p class="alerta">Por favor, preencha todos os campos corretamente.</p>';
        return;
    }

    let mensagem = `<strong>Análise Regulatória ANAC:</strong><br>`;

    if (pmd > 250) {
        mensagem += `• Registro no SISANT: <strong>OBRIGATÓRIO</strong> (PMD superior a 250g).<br>`;
    } else {
        if (finalidade !== 'recreativo') {
            mensagem += `• Registro no SISANT: <strong>ALTAMENTE RECOMENDADO</strong> (Uso comercial/profissional com PMD abaixo de 250g para mitigação de riscos).<br>`;
        } else {
            mensagem += `• Registro no SISANT: Dispensado para voos estritamente recreativos abaixo de 250g.<br>`;
        }
    }

    if (pmd <= 25000) {
        mensagem += `• Categoria da Aeronave: <strong>Classe 3</strong> (PMD até 25 kg).<br>`;
    } else if (pmd <= 150000) {
        mensagem += `• Categoria da Aeronave: <strong>Classe 2</strong> (PMD de 25 kg a 150 kg).<br>`;
    } else {
        mensagem += `• Categoria da Aeronave: <strong>Classe 1</strong> (PMD superior a 150 kg).<br>`;
    }

    if (tipoPessoa === 'PJ') {
        mensagem += `• Nota de Cadastro PJ: Lembre-se que o primeiro acesso ao SISANT deve ser realizado via Pessoa Física.<br>`;
    }

    painel.innerHTML = `<p class="sucesso">${mensagem}</p>`;
}

function calcularJanelaVoo() {
    const nascerStr = document.getElementById('nascer-sol').value;
    const porStr = document.getElementById('por-sol').value;
    const painel = document.getElementById('resultado-janela');

    if (!nascerStr || !porStr) {
        painel.innerHTML = '<p class="alerta">Insira os horários do nascer e do pôr do sol.</p>';
        return;
    }

    const [hNascer, mNascer] = nascerStr.split(':').map(Number);
    const [hPor, mPor] = porStr.split(':').map(Number);

    const minPico = (hNascer * 60 + mNascer + hPor * 60 + mPor) / 2;
    const formatarHora = (minutos) => `${String(Math.floor(minutos / 60) % 24).padStart(2, '0')}:${String(Math.round(minutos % 60)).padStart(2, '0')}`;

    painel.innerHTML = `
        <p class="sucesso">
            <strong>Cálculo de Solarimetria:</strong><br>
            • Horário do Sol a Pino (Pico): <strong>${formatarHora(minPico)}</strong><br>
            • Início da Janela de Voo: <strong>${formatarHora(minPico - 180)}</strong> (-3 horas)<br>
            • Término da Janela de Voo: <strong>${formatarHora(minPico + 180)}</strong> (+3 horas)
        </p>
    `;
}

function avaliarCondicoesVoo() {
    const modelo = document.getElementById('modelo-drone').value;
    const vento = parseFloat(document.getElementById('velocidade-vento').value);
    const operacao = document.getElementById('tipo-operacao').value;
    const painel = document.getElementById('resultado-clima');

    if (isNaN(vento)) {
        painel.innerHTML = '<p class="alerta">Informe a velocidade do vento.</p>';
        return;
    }

    let limiteVento = (modelo === 'mini1') ? 8.0 : (modelo === 'mini3') ? 10.7 : 10.0;
    const ventoKmh = (vento * 3.6).toFixed(1);
    
    let status = (vento <= limiteVento) 
        ? `<span class="texto-verde">Aprovado: O vento de ${vento} m/s (${ventoKmh} km/h) está dentro do limite suportado (${limiteVento} m/s).</span>`
        : `<span class="texto-vermelho">Reprovado: O vento de ${vento} m/s (${ventoKmh} km/h) excede o limite máximo (${limiteVento} m/s). RISCO DE PERDA DA AERONAVE.</span>`;

    painel.innerHTML = `<p><strong>Avaliação de Segurança do Voo:</strong><br>• Operação Selecionada: <strong>${operacao}</strong><br>• ${status}</p>`;
}

function calcularRiscoOperacional() {
    const prob = parseInt(document.getElementById('probabilidade').value);
    const sev = document.getElementById('severidade').value;
    const painel = document.getElementById('resultado-risco');

    let classeRisco, recomendacao;

    if (prob >= 4 && (sev === 'A' || sev === 'B')) {
        classeRisco = '<strong class="texto-vermelho">ALTO (Inaceitável)</strong>';
        recomendacao = 'A operação não deve ser realizada sob estas condições sem mitigação imediata de riscos.';
    } else if (prob >= 3 || sev === 'C') {
        classeRisco = '<strong class="texto-laranja">MÉDIO (Tolerável)</strong>';
        recomendacao = 'A operação pode ser realizada, desde que haja medidas de controle ativas e monitoramento constante.';
    } else {
        classeRisco = '<strong class="texto-verde">BAIXO (Aceitável)</strong>';
        recomendacao = 'A operação apresenta baixo risco e está liberada seguindo o procedimento padrão.';
    }

    painel.innerHTML = `<p><strong>Resultado da Matriz de Risco (IS Nº E94-003):</strong><br>• Combinação: Probabilidade Nível ${prob} x Severidade Nível ${sev}<br>• Classificação de Risco: ${classeRisco}<br>• Recomendação: ${recomendacao}</p>`;
}