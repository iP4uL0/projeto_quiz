
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