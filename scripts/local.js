const currentYearSpan = document.querySelector("#currentyear");
const lastModifiedSpan = document.querySelector("#lastModified");

const today = new Date();
currentYearSpan.textContent = today.getFullYear();
lastModifiedSpan.textContent = document.lastModified;

function atualizarRelogios() {
    const agora = new Date();

    const horaMonteMor = agora.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    document.querySelector("#hora-montemor").textContent = horaMonteMor;

    const horaSeattle = agora.toLocaleTimeString('pt-BR', { timeZone: 'America/Los_Angeles' });
    document.querySelector("#hora-seattle").textContent = horaSeattle;

    const horaUTC = agora.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });
    document.querySelector("#hora-utc").textContent = horaUTC;

    const horaBrasilia = agora.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    document.querySelector("#hora-brasilia").textContent = horaBrasilia;
}

atualizarRelogios();
setInterval(atualizarRelogios, 1000);

const temperatura = 12;
const velocidadeVento = 15;

function calcularSensacaoTermica(temp, vento) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(vento, 0.16) + 0.3965 * temp * Math.pow(vento, 0.16)).toFixed(1);
}

const elementoSensacao = document.querySelector("#windchill");

if (temperatura <= 10 && velocidadeVento > 4.8) {
    elementoSensacao.textContent = calcularSensacaoTermica(temperatura, velocidadeVento) + " °C";
} else {
    elementoSensacao.textContent = "N/A";
}