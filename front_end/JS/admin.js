document.addEventListener("DOMContentLoaded", loadQuestions())
const botao = document.querySelector('#cadastrar')
botao.addEventListener('click', async function(event){
    event.preventDefault(); // Impede o envio do formulário
  
  const pergunta = document.querySelector('#pergunta').value;
  const a = document.querySelector('#a').value;
  const b = document.querySelector('#b').value;
  const c = document.querySelector('#c').value;
  const d = document.querySelector('#d').value;
  const dificuldade = document.querySelector('input[name="dificuldade"]:checked').value;
  const correct_answer = document.querySelector('#correta').value;
  

  const res = await fetch('http://localhost:3000/Cperguntas',{

      method: "POST",
      headers: {
          "Content-Type": "application/json" // Adiciona o cabeçalho correto
      },
      body: JSON.stringify({
          pergunta: pergunta,
          a: a,
          b: b,
          c: c,
          d: d,
          dificuldade: dificuldade,
          correct_answer: correct_answer            
      })
  });
  
  if(res.status == 200){
    alert('Questões adicionadas com sucesso')
  }
  else if(res.status == 500){
    alert('Ops...houve um erro ao adicionar')
  } 
  
  })


  async function loadQuestions() {
    const questionList = document.getElementById("questionList");
    questionList.innerHTML = ""; // Limpa a lista antes de carregar

    try {
        const response = await fetch("http://localhost:3000/Aperguntas");
        const questions = await response.json();

        // console.log(questions); // Apenas para garantir que estamos recebendo as perguntas

        // Adiciona cada pergunta à lista
        // questions.map((questao) => addQuestionToPage(questao));
        questions.forEach((questao, index) => {
          // console.log(`Processando pergunta ${index + 1}:`, questao); // Log para depuração
          addQuestionToPage(questao);
      });
    } catch (error) {
        return(error)
    }
}

   async function addQuestionToPage(questao) {
    const questionList = document.getElementById("questionList");

    // Cria o card
    const card = document.createElement("div");
    card.inputMode =
    card.classList.add("card");


    const hiddenIdInput = document.createElement("input");
    hiddenIdInput.type = "hidden";
    hiddenIdInput.value = questao.id;
    hiddenIdInput.classList.add("question-id");
  

    // Título da pergunta
    const questionTitle = document.createElement("h3");
    questionTitle.classList.add("card-title");
    questionTitle.innerText = `Pergunta: ${questao.pergunta}`;

    // Alternativas
    const alternatives = document.createElement("ul");
    alternatives.classList.add("card-alternatives");

    ["a", "b", "c", "d"].forEach((key) => {
      const alternative = document.createElement("li");
      alternative.innerText = `${key.toUpperCase()}: ${questao[key]}`;
      alternatives.appendChild(alternative);
    });

    // Resposta correta
    const correctAnswer = document.createElement("p");
    correctAnswer.classList.add("card-correct-answer");
    correctAnswer.innerText = `Resposta correta: ${questao.correct_answer}`;


    //* Botão de deletar
  const deleteButton = document.createElement("button");
deleteButton.innerText = "Excluir";
deleteButton.classList.add("delete-button");
deleteButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`http://localhost:3000/Delete/${questao.id}`, {
      method: "DELETE",
  
    });
    if (response.ok) {
      alert('Pergunta excluida')
      card.remove(); // Remove o card da tela
    } else {
      alert("Erro ao deletar a pergunta.");
    }
  } catch (error) {
    console.error("Erro na exclusão:", error);
  }
});

// 
// !MODAL!

const editbutton = document.createElement("button");
editbutton.innerText = "Excluir";
editbutton.classList.add("delete-button");
editbutton.addEventListener("click", async () => {})
  

  try {
    const response = await fetch(`http://localhost:3000/Delete/${questao.id}`,{
      method: "PUT",})
    

const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach((button) => { //pega qual dos botões foram selecionados da class .open-modal

  button.addEventListener("click", () => { //arrow function pegar algo - no caso clique do botão
    const modalId = button.getAttribute("data-modal"); //especificar qual ATRIBUTO - data-modal foi pego 
    const modal = document.getElementById(modalId); //especificar qual elemento por ID foi pego 
    modal.showModal(); //show ou showModal

  });
});
  }

catch{}

// Monta o card
card.append(questionTitle,  hiddenIdInput,  alternatives, correctAnswer, deleteButton);

    // Adiciona o card ao contêiner de perguntas
    questionList.appendChild(card);
   
  }
