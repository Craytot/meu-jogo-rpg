let personagemAtual = null; // Variável para armazenar o personagem atual
let inventario = []; // Variável para armazenar o inventário

document.addEventListener("DOMContentLoaded", () => {
    const criarPersonagemButton = document.getElementById("criar-personagem-button");

    criarPersonagemButton.onclick = () => {
        const nome = prompt("Nome do personagem:");
        const nivel = parseInt(prompt("Nível do personagem:"));
        const vida = parseInt(prompt("Vida do personagem:"));
        const ataque = parseInt(prompt("Ataque do personagem:"));

        personagemAtual = {
            nome: nome,
            nivel: nivel,
            vida: vida,
            ataque: ataque
        };

        const template = `
            <p>Nome: ${personagemAtual.nome}</p>
            <p>Nível: ${personagemAtual.nivel}</p>
            <p>Vida: ${personagemAtual.vida}</p>
            <p>Ataque: ${personagemAtual.ataque}</p>
        `;

        document.getElementById("resultado-criacao").innerHTML = template;
    };

    const adicionarItemButton = document.getElementById("adicionar-item-button");

    adicionarItemButton.onclick = () => {
        const nome = prompt("Nome do item:");
        const descricao = prompt("Descrição do item:");

        const item = {
            nome: nome,
            descricao: descricao
        };

        inventario.push(item); // Adiciona o item ao inventário

        const template = `
            <p>Nome: ${item.nome}</p>
            <p>Descrição: ${item.descricao}</p>
        `;

        document.getElementById("lista-inventario").innerHTML += template;
    };

    const rolarDado = (sides) => {
        const resultado = Math.floor(Math.random() * sides) + 1;
        document.getElementById("resultado-dado").innerText = `Resultado: ${resultado}`;
    };

    document.getElementById("rolar-d4-button").onclick = () => rolarDado(4);
    document.getElementById("rolar-d6-button").onclick = () => rolarDado(6);
    document.getElementById("rolar-d8-button").onclick = () => rolarDado(8);
    document.getElementById("rolar-d10-button").onclick = () => rolarDado(10);
    document.getElementById("rolar-d12-button").onclick = () => rolarDado(12);
    document.getElementById("rolar-d20-button").onclick = () => rolarDado(20);

    const salvarAnotacoesButton = document.getElementById("salvar-anotacoes-button");

    salvarAnotacoesButton.onclick = () => {
        const anotacoes = document.getElementById("anotacoes-textarea").value;
        localStorage.setItem("anotacoes", anotacoes);
        alert("Anotações salvas!");
    };

    const carregarAnotacoesButton = document.getElementById("carregar-anotacoes-button");

    carregarAnotacoesButton.onclick = () => {
        const anotacoes = localStorage.getItem("anotacoes");
        document.getElementById("anotacoes-textarea").value = anotacoes;
    };

    // Função para salvar personagem no localStorage
    const salvarPersonagemButton = document.getElementById("salvar-personagem-button");
    salvarPersonagemButton.onclick = () => {
        if (personagemAtual) {
            localStorage.setItem("personagem", JSON.stringify(personagemAtual));
            alert("Personagem salvo!");
        } else {
            alert("Nenhum personagem criado para salvar.");
        }
    };

    // Função para carregar personagem do localStorage
    const carregarPersonagemButton = document.getElementById("carregar-personagem-button");
    carregarPersonagemButton.onclick = () => {
        const personagemSalvo = localStorage.getItem("personagem");
        if (personagemSalvo) {
            personagemAtual = JSON.parse(personagemSalvo);
            const template = `
                <p>Nome: ${personagemAtual.nome}</p>
                <p>Nível: ${personagemAtual.nivel}</p>
                <p>Vida: ${personagemAtual.vida}</p>
                <p>Ataque: ${personagemAtual.ataque}</p>
            `;
            document.getElementById("resultado-criacao").innerHTML = template;
            alert("Personagem carregado!");
        } else {
            alert("Nenhum personagem salvo encontrado.");
        }
    };

    // Função para salvar inventário no localStorage
    const salvarInventarioButton = document.getElementById("salvar-inventario-button");
    salvarInventarioButton.onclick = () => {
        localStorage.setItem("inventario", JSON.stringify(inventario));
        alert("Inventário salvo!");
    };

    // Função para carregar inventário do localStorage
    const carregarInventarioButton = document.getElementById("carregar-inventario-button");
    carregarInventarioButton.onclick = () => {
        const inventarioSalvo = localStorage.getItem("inventario");
        if (inventarioSalvo) {
            inventario = JSON.parse(inventarioSalvo);
            document.getElementById("lista-inventario").innerHTML = ''; // Limpa o inventário atual

            inventario.forEach(item => {
                const template = `
                    <p>Nome: ${item.nome}</p>
                    <p>Descrição: ${item.descricao}</p>
                `;
                document.getElementById("lista-inventario").innerHTML += template;
            });

            alert("Inventário carregado!");
        } else {
            alert("Nenhum inventário salvo encontrado.");
        }
    };

    // Carregar anotações automaticamente
    const anotacoes = localStorage.getItem("anotacoes");
    if (anotacoes) {
        document.getElementById("anotacoes-textarea").value = anotacoes;
    }
});

