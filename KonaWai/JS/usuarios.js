function logar(){
var inEmail = document.getElementById("inEmail");
  var inSenha = document.getElementById("inSenha");

  var email = inEmail.value;
  var senha = inSenha.value;

  if (email === "") {
    alert("o Email esta incorreto...");

    email.focus();
    return;
  }
  if (senha === "" || isNaN(senha)) {
    alert("Senha  incorreta...");

    senha.focus();
    return;
  }

  window.location.replace("home.html");   
}

var btnEntrar = document.getElementById("btnEntrar");
btnEntrar.addEventListener("click", logar);
