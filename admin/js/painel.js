
let categorias = [];
let produtos = {};

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(tab).style.display = 'block';
}

function abrirModalCategoria() {
  document.getElementById('modal-categoria').style.display = 'flex';
}

function fecharModal(id) {
  document.getElementById(id).style.display = 'none';
}

function criarCategoria() {
  const nome = document.getElementById("nomeCategoria").value;
  const ordem = document.getElementById("ordemCategoria").value;
  if (!nome || !ordem) return;
  const id = Date.now();
  categorias.push({ id, nome, ordem });
  produtos[id] = [];
  renderCategorias();
  fecharModal("modal-categoria");
}

function renderCategorias() {
  const container = document.getElementById("lista-categorias");
  container.innerHTML = "";
  categorias.sort((a,b) => a.ordem - b.ordem).forEach(cat => {
    let div = document.createElement("div");
    div.innerHTML = `
      <h4>${cat.nome} <button onclick="abrirModalProduto(${cat.id})">+ Criar item</button>
      <button onclick="excluirCategoria(${cat.id})">Excluir</button></h4>
      <div>${produtos[cat.id].map((p,i) => `
        <div>${p.nome} - R$${p.valor}
          <button onclick="excluirProduto(${cat.id}, ${i})">Excluir</button>
        </div>`).join("")}</div>
    `;
    container.appendChild(div);
  });
}

let idCategoriaAtual = null;
function abrirModalProduto(idCategoria) {
  idCategoriaAtual = idCategoria;
  document.getElementById("saboresInputs").innerHTML = "";
  document.getElementById("modal-produto").style.display = "flex";
}

function criarProduto() {
  const nome = document.getElementById("nomeProduto").value;
  const descricao = document.getElementById("descricaoProduto").value;
  const valor = document.getElementById("valorProduto").value;
  const temSabores = document.querySelector("input[name='temSabores']:checked").value;
  const sabores = [...document.querySelectorAll(".input-sabor")].map(el => el.value).filter(Boolean);
  produtos[idCategoriaAtual].push({ nome, descricao, valor, sabores: temSabores === "sim" ? sabores : [] });
  fecharModal("modal-produto");
  renderCategorias();
}

function adicionarMaisSabores() {
  const container = document.getElementById("saboresInputs");
  for (let i = 0; i < 10; i++) {
    const input = document.createElement("input");
    input.placeholder = `Sabor ${container.children.length + 1}`;
    input.className = "input-sabor";
    container.appendChild(input);
  }
}

document.querySelectorAll("input[name='temSabores']").forEach(r => {
  r.addEventListener("change", () => {
    document.getElementById("saboresInputs").style.display = r.value === "sim" ? "block" : "none";
  });
});

function excluirCategoria(id) {
  categorias = categorias.filter(cat => cat.id !== id);
  delete produtos[id];
  renderCategorias();
}

function excluirProduto(idCat, index) {
  produtos[idCat].splice(index, 1);
  renderCategorias();
}
