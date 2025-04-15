
let pedidos = [];
let produtos = [];

function mostrarAba(id) {
  document.querySelectorAll('.aba').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if (id === 'relatorios') calcularRelatorios();
  if (id === 'pedidos') atualizarPedidos();
  if (id === 'produtos') atualizarProdutos();
}

function toggleSabores() {
  const saborInput = document.getElementById('sabores');
  saborInput.style.display = document.getElementById('temSabores').checked ? 'block' : 'none';
}

function cadastrarProduto(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const categoria = document.getElementById('categoria').value;
  const sabores = document.getElementById('temSabores').checked ?
    document.getElementById('sabores').value.split(',').map(s => s.trim()) : [];

  const produto = { nome, preco, categoria, sabores };
  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  atualizarProdutos();
  e.target.reset();
  document.getElementById('sabores').style.display = 'none';
}

function atualizarProdutos() {
  const container = document.getElementById('produtos-lista');
  container.innerHTML = '';
  produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.forEach((p, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${p.nome}</strong> - R$ ${p.preco.toFixed(2)} - ${p.categoria} ${p.sabores.length ? '(com sabores)' : ''}`;
    container.appendChild(div);
  });
}

function atualizarPedidos() {
  const container = document.getElementById('lista-pedidos');
  container.innerHTML = '';
  pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `🧾 <strong>${p.nome}</strong> - R$ ${p.total.toFixed(2)}<br><small>${new Date(p.data).toLocaleString()}</small><hr>`;
    container.appendChild(div);
  });
}

function calcularRelatorios() {
  const hoje = new Date();
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  let totalDia = 0, totalMes = 0, totalGeral = 0;

  pedidos.forEach(p => {
    const data = new Date(p.data);
    const valor = p.total;
    if (data.toDateString() === hoje.toDateString()) totalDia += valor;
    if (data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear()) totalMes += valor;
    totalGeral += valor;
  });

  document.getElementById('vendas-dia').textContent = totalDia.toFixed(2);
  document.getElementById('vendas-mes').textContent = totalMes.toFixed(2);
  document.getElementById('vendas-total').textContent = totalGeral.toFixed(2);
}

// Inicialização
mostrarAba('pedidos');
