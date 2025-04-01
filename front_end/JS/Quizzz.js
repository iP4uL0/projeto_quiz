document.addEventListener("DOMContentLoaded", loadQuestion);

const questao = document.querySelector(".questao"); // Elemento onde o enunciado será exibido
const opcoes = document.querySelector(".opcoes"); // Elemento para as opções
const proxima = document.querySelector("#proximo"); // Botão "Próximo"

// Função para carregar uma pergunta aleatória
async function loadQuestion() {
    try {
        // Faz a requisição para buscar uma pergunta aleatória
        const resposta = await fetch("http://localhost:3000/Bperguntas", {
            method: "GET", // GET se a API aceita GET
        });

        // Converte a resposta em JSON
        const questaoAtual = await resposta.json();

        const questoes = questaoAtual[0];

        // Atualiza o enunciado da questão
        questao.innerText = questoes.pergunta;

        // Guarda a resposta correta
        respostaCorreta = questoes.resposta; // Exemplo: "A"

        // Gera os inputs de opções
        opcoes.innerHTML = `
            <label><input type="radio" name="resposta" value="A"> A) ${questoes.a}</label><br>
            <label><input type="radio" name="resposta" value="B"> B) ${questoes.b}</label><br>
            <label><input type="radio" name="resposta" value="C"> C) ${questoes.c}</label><br>
            <label><input type="radio" name="resposta" value="D"> D) ${questoes.d}</label><br>
        `;

    } catch (error) {
        console.error("Erro ao carregar a questão:", error);
        questao.innerText = "Erro ao carregar a questão.";
    }
}
    
//verificar a resposta
async function verificar() {
    const Selecionada = document.querySelector('')
    
    if(!Selecionada){
        alert("Selecione uma resposta para continuar")
        return;
    }
    else if(Selecionada.value == resposta){
        alert("✅ Resposta correta!");
    }
    else{
        alert("❌ Resposta errada. A correta era: ");
    }
 }

// Adiciona funcionalidade ao botão "Próximo"
proxima.addEventListener("click", verificar);
