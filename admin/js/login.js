
function login() {
  const senha = document.getElementById("password").value;
  if (senha === "1234") {
    window.location.href = "painel.html";
  } else {
    alert("Senha incorreta!");
  }
}
