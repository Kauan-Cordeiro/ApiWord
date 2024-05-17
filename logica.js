function view() {
    let val1 = document.getElementById("cadastroForm");
    let val2 = document.getElementById("loginForm");
    let text1 = document.getElementById("log");
    let text2 = document.getElementById("cad");
    let vem = document.getElementById("vindo");
    let vai = document.getElementById("ola");

    val1.style.display = "block";
    val2.style.display = "none";
    text2.style.display = "block";
    text1.style.display = "none";
    vai.style.display = "block"
    vem.style.display = "none"
}
function Review() {
    let val1 = document.getElementById("cadastroForm");
    let val2 = document.getElementById("loginForm");
    let text1 = document.getElementById("log");
    let text2 = document.getElementById("cad");
    let vem = document.getElementById("vindo");
    let vai = document.getElementById("ola");

    val1.style.display = "none";
    val2.style.display = "block";
    text2.style.display = "none";
    text1.style.display = "block";
    vai.style.display = "none"
    vem.style.display = "block"
}



document.addEventListener('DOMContentLoaded', function() {
   // Verifica se há dados de login armazenados
   const usuarioLogado = localStorage.getItem('usuarioLogado');

   // Se o usuário estiver logado, exibe o nome na div 'nomeUsuarioDiv'
   if (usuarioLogado) {
       const nomeUsuarioDiv = document.getElementById('nomeUsuarioDiv');
       nomeUsuarioDiv.innerHTML = usuarioLogado;
       nomeUsuarioDiv.style.display = 'block';

       // Esconde o botão 'biri'
       const biriButton = document.getElementById('biri');
       biriButton.style.display = 'none';
   }
});

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
   event.preventDefault(); // Impede o envio padrão do formulário

   const email = document.getElementById('cadastroEmail').value;
   const senha = document.getElementById('cadastroSenha').value;
   const nome = document.getElementById('cadastroNome').value;
   const cpf = document.getElementById('cadastroCPF').value;
   const telefone = document.getElementById('cadastroTelefone').value;

   // Envia os dados para o servidor usando fetch
   fetch('http://localhost:3000/cadastrar', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ email, senha, nome, cpf, telefone })
   })
   .then(response => response.json())
   .then(data => {
       document.getElementById('cadastroSenha').value = "";
       document.getElementById('cadastroNome').value = "";
       document.getElementById('cadastroCPF').value = "";
       document.getElementById('cadastroTelefone').value = "";
       document.getElementById('cadastroEmail').value = "";
       alert("Usuário cadastrado com sucesso");
   })
   .catch(error =>  {
       console.error('Erro:', error);
       alert("Erro ao cadastrar usuário");
   });
});
 

// Função para realizar login
document.getElementById('loginForm').addEventListener('submit', function(event) {
   event.preventDefault(); // Impede o envio padrão do formulário

   const email = document.getElementById('loginEmail').value;
   const senha = document.getElementById('loginSenha').value;
   
   const offcanvas = document.querySelector('#offcanvasScrolling');
   const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
   offcanvasInstance.hide();

   // Envia os dados para o servidor usando fetch
   fetch('http://localhost:3000/login', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ email, senha })
   })
   .then(response => response.json())
   .then(data => {
       if (data.sucesso) {
           // Obtém o nome do usuário
           fetch(`http://localhost:3000/obterUsuario?email=${email}`)
           .then(response => response.json())
           .then(data => {
               if (data.sucesso) {
                   // Exibe o nome do usuário na div 'nomeUsuarioDiv'
                   const nomeUsuarioDiv = document.getElementById('nomeUsuarioDiv');
                   const vazaDiv = document.getElementById('biri');

                   document.getElementById('loginEmail').value = '';
                   document.getElementById('loginSenha').value = '';

                   // Extrai o primeiro nome
                   const primeiroNome = data.nome.split(' ')[0];

                   nomeUsuarioDiv.innerHTML = `Olá ${primeiroNome} <i class="bi bi-person-circle"></i> `;
                   nomeUsuarioDiv.style.display = 'block';

                   // Armazena o nome do usuário no localStorage
                   localStorage.setItem('usuarioLogado', nomeUsuarioDiv.innerHTML);
                   vazaDiv.style.display = 'none';
               } else {
                   console.error('Erro ao obter o nome do usuário:', data.mensagem);
               }
           })
           .catch(error => {
               console.error('Erro ao realizar a requisição para obter o nome do usuário:', error);
           });
           
       } else {
           console.error('Erro no login:', data.mensagem);
           alert("Erro ao efetuar login");
       }
   })
   .catch(error => {
       console.error('Erro ao realizar a requisição:', error);
   });
});

// Função para fazer logout
function sair() {
   // Limpa os dados de login armazenados
   localStorage.removeItem('usuarioLogado');

   // Limpa o conteúdo da div 'nomeUsuarioDiv'
   const nomeUsuarioDiv = document.getElementById('nomeUsuarioDiv');
   const int = document.getElementById('biri');
   nomeUsuarioDiv.innerHTML = '';
   nomeUsuarioDiv.style.display = 'none';
   int.style.display = 'block';

   document.getElementById('cadastroEmail').value = '';
   document.getElementById('cadastroSenha').value = '';
   document.getElementById('cadastroNome').value = '';
   document.getElementById('cadastroCPF').value = '';
   document.getElementById('cadastroTelefone').value = '';
}

////////////////////////////////////////////////////////////

