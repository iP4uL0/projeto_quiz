// Login do usuário
document.querySelector("#botaologin").addEventListener("click", async (event) => {
    event.preventDefault() // impede o envio do formulário

    const usuario = document.querySelector("#Alunologin").value;
    const senha = document.querySelector("#senhaLogin").value;
    console.log(usuario, senha)
    if (usuario != '' && senha != '') {
       
        try {
            const response = await fetch(`http://localhost:3000/usuario/senha`);
            if (response.status != 200) {

                // Redireciona para a página home
                alert('Login realizado com sucesso!!')
           
            } else {
                alert('Usuário ou senha incorretos!', 'danger');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login. Tente novamente mais tarde.', 'danger');
        }
    } else {
        alert('Preencha todos os campos!', 'warning');
    }
});

// Cadastro
