const d = new Date();
let anoAtual = d.getFullYear();
document.getElementById("anoatual").textContent = anoAtual;

let ultimaModificacao = document.lastModified;
document.getElementById("ultimaModificacao").textContent = "Última modificação: " + ultimaModificacao;