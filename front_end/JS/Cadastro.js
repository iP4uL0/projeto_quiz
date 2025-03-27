document.querySelector("#cadastrar").addEventListener("click", async (event) => {
    event.preventDefault();
  
    const usuario = document.querySelector("#usuario").value;
    const senha = document.querySelector("#senha").value;
    const confirmacao = document.querySelector("#senhaConfirmacao").value;
  
    if (senha !== confirmacao) {
        alert('As senhas não se coincidem')
    }
  
    try {
        const response = await fetch('http://localhost:3000/usuario',{
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Adiciona o cabeçalho correto
            },
            body: JSON.stringify({
        
                usuario: usuario,
                senha: senha
                
            })
        })
  
        if (response.ok) {
            alert("Cadastro realizado com sucesso!", "success");
            window.location.replace("../front_end/index.html")
        } else {
            const data = await response.json();
            alert(data.error || "Erro ao realizar cadastro.", "danger");
        }
    } 
    catch (error) {

        alert("Erro ao tentar cadastrar. Tente novamente mais tarde.", "danger");
    }
  });