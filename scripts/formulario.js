const produtos = [
    { id: "p1", nome: "Drone Phantom X" },
    { id: "p2", nome: "Câmera de Ação 4K" },
    { id: "p3", nome: "Estabilizador Gimbal Pro" },
    { id: "p4", nome: "Óculos FPV Vision" }
];

document.addEventListener("DOMContentLoaded", () => {
    const selectProduto = document.getElementById("produto");
    if (selectProduto) {
        produtos.forEach(produto => {
            const option = document.createElement("option");
            option.value = produto.id;
            option.textContent = produto.nome;
            selectProduto.appendChild(option);
        });
    }

    const spanModificacao = document.getElementById("ultima-modificacao");
    if (spanModificacao) {
        spanModificacao.textContent = "Última Modificação: " + document.lastModified;
    }
});