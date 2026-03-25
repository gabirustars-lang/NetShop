// =============================
//  RamPC — Carrinho de Compras
// =============================

const cart = [];

// Preços base dos produtos (R$)
const precosProdutos = {
  1: { nome: "PC Ryzen + RTX",        base: 3500 },
  2: { nome: "PC Intel + RTX",        base: 3800 },
  3: { nome: "PC Ryzen + AMD RX",     base: 3200 },
  4: { nome: "PC Intel + AMD RX",     base: 3400 },
  5: { nome: "PC Ryzen + RTX (Sport)",base: 4200 },
};

// Preços adicionais por componente
// =============================
//  RamPC — Preços Atualizados (Março 2026)
// =============================

// Preços adicionais por componente — valores reais mercado BR

// ─── RAM ────────────────────────────────────────────
// Mercado em crise: DDR4/DDR5 dispararam em 2026
const precosRam = {
  "4gb":   0,
  "8gb":   250,    // ~R$250 (Kingston/XPG 8GB DDR4 3200)
  "16gb":  900,    // ~R$900 (16GB DDR4 3200 — pico jan/2026)
  "32gb":  1800,   // ~R$1.800 (kit 2x16GB DDR4)
  "64gb":  3600,   // ~R$3.600 (kit 2x32GB DDR4)
};

// ─── PROCESSADORES AMD RYZEN ────────────────────────
// Fontes: Kabum, Pichau, Adrenaline Guia 2025/2026
const precosProcessadorRyzen = {
  // Ryzen 3
  "R3 1200":   0,
  "R3 1300X":  80,
  "R3 2200G":  150,
  "R3 3200G":  200,
  "R3 4100":   534,    // R$534 (Mercado Livre 2025)
  "R3 5300G":  650,

  // Ryzen 5
  "R5 1600":   300,
  "R5 2600":   400,
  "R5 3600":   500,
  "R5 5500":   570,    // R$570 (Pichau fev/2026)
  "R5 5600":   700,    // ~R$700
  "R5 5600X":  750,
  "R5 7600":   1400,   // Guia Adrenaline: "até R$1.500"
  "R5 7600X":  1500,
  "R5 9600X":  1800,   // Canaltech 2025

  // Ryzen 7
  "R7 1700":   400,
  "R7 2700X":  500,
  "R7 3700X":  700,
  "R7 5700X":  1400,   // Guia Adrenaline: "até R$1.500"
  "R7 5800X":  1600,
  "R7 5800X3D": 1900,
  "R7 7700X":  2100,
  "R7 7800X3D": 2800,  // Kabum/Canaltech 2025 ~R$3.000
  "R7 9700X":  2600,
  "R7 9800X3D": 3200,  // Canaltech: "passa de R$3.000"

  // Ryzen 9
  "R9 3900X":  1200,
  "R9 3950X":  1600,
  "R9 5900X":  2000,
  "R9 5950X":  2800,
  "R9 7900X":  2800,
  "R9 7900X3D": 3200,
  "R9 7950X":  3800,
  "R9 7950X3D": 4500,
  "R9 9900X":  3500,
  "R9 9950X":  5000,   // Canaltech: R9 9950X3D ≈ R$5.000+
};

// ─── PROCESSADORES INTEL ────────────────────────────
// Fontes: TechTudo 2025, Adrenaline Guia 2025
const precosProcessadorIntel = {
  // Core i3
  "i3-10100":   0,
  "i3-10100F":  0,
  "i3-12100":   400,
  "i3-12100F":  350,
  "i3-13100":   500,   // TechTudo: ~R$500
  "i3-13100F":  450,
  "i3-14100":   600,
  "i3-14100F":  550,

  // Core i5
  "i5-10400":   400,
  "i5-10400F":  350,
  "i5-10600K":  500,
  "i5-12400":   750,
  "i5-12400F":  650,   // TechTudo: R$659
  "i5-13400":   850,   // Adrenaline: "até R$1.000"
  "i5-13400F":  780,
  "i5-13600K":  1200,  // Adrenaline: "até R$1.500"
  "i5-13600KF": 1150,
  "i5-14400":   900,
  "i5-14400F":  850,
  "i5-14600K":  1400,
  "i5-14600KF": 1350,

  // Core i7
  "i7-12700":   1400,
  "i7-12700F":  1300,
  "i7-13700":   1800,
  "i7-13700F":  1700,
  "i7-13700K":  2000,
  "i7-13700KF": 1900,
  "i7-14700":   2000,  // Adrenaline: "até R$2.500"
  "i7-14700F":  1900,
  "i7-14700K":  2200,
  "i7-14700KF": 2100,

  // Core i9
  "i9-12900K":  2500,
  "i9-13900K":  3200,
  "i9-13900KF": 3000,
  "i9-14900K":  3500,
  "i9-14900KF": 3300,

  // Core Ultra (Arrow Lake)
  "Core Ultra 5 245K":  2200,  // Adrenaline: "até R$2.500"
  "Core Ultra 5 245KF": 2100,
  "Core Ultra 7 265K":  2800,  // Adrenaline: "até R$2.500"
  "Core Ultra 7 265KF": 2700,
  "Core Ultra 9 285K":  4000,
};

// ─── GPUs NVIDIA RTX ────────────────────────────────
// Fontes: hardwarebarato.com, placasdevideo.com (mar/2026)
const precosGPU = {
  // Série 30 (Ada)
  "RTX3050":  0,
  "RTX3060":  700,    // ~R$700–900 usado/estoque
  "RTX3070":  1200,
  "RTX3080":  2000,
  "RTX3090":  3500,

  // Série 40 (Ada Lovelace)
  "RTX4060":  1500,   // placasdevideo.com: mín. ~R$950, médio R$1.500
  "RTX4070":  2800,   // ~R$2.800
  "RTX4080":  6500,   // ~R$6.500
  "RTX4090":  12000,  // escasso, preço inflado

  // Série 50 (Blackwell)
  "RTX5060":  2200,   // lançamento ~R$2.200
  "RTX5070":  4500,   // ~R$4.500
  "RTX5080":  10000,  // hardwarebarato.com: R$9.999
  "RTX5090":  22000,  // hardwarebarato.com: R$21.999
};

// ─── GPUs AMD RADEON ─────────────────────────────────
// Fontes: placasdevideo.com, hardwarebarato.com (mar/2026)
const precosAMD = {
  // Série RX 6000 (RDNA2)
  "RX6400":   0,
  "RX6500XT": 500,
  "RX6600XT": 900,
  "RX6650XT": 1100,
  "RX6700":   1400,
  "RX6750XT": 1600,
  "RX6800":   2200,
  "RX6800XT": 2800,
  "RX6900XT": 3500,

  // Série RX 7000 (RDNA3)
  "RX7600":   1400,   // ~R$1.400–1.500 (placasdevideo.com)
  "RX7700XT": 2200,
  "RX7800XT": 2800,
  "RX7900GRE": 3200,
  "RX7900XT": 4000,
  "RX7900XTX": 5000,

  // Série RX 9000 (RDNA4)
  "RX9060":   2000,
  "RX9060XT": 2400,
  "RX9070":   3200,
  "RX9070XT": 3800,   // Tom's Hardware: ~$649 USD → ~R$3.800
  "RX9080":   5500,
};

// ─── SSD NVMe ───────────────────────────────────────
// Preços subiram +40% em 2026 (TrendForce / hardware.com.br)
const precosSSD = {
  "256gb":  250,    // ~R$250
  "512gb":  450,    // ~R$450
  "1tb":    900,    // Samsung 990 Pro 1TB ~R$650–900 (smartoutlets)
  "2tb":    1800,   // escassez: +40% vs 2024
  "4tb":    3500,
  "8tb":    6500,
};

// ─────────────────────────────────────────────
//  Calcula preço total de um produto
// ─────────────────────────────────────────────
function calcularPreco(produtoId, config) {
  let total = precosProdutos[produtoId].base;

  total += precosRam[config.ram] ?? 0;
  total += precosProcessadorRyzen[config.processadorRyzen] ?? 0;
  total += precosProcessadorIntel[config.processadorIntel] ?? 0;
  total += precosGPU[config.gpu] ?? 0;
  total += precosAMD[config.placaAMD] ?? 0;
  total += precosSSD[config.ssd] ?? 0;

  return total;
}

// ─────────────────────────────────────────────
//  Lê a configuração selecionada de um produto
// ─────────────────────────────────────────────
function lerConfigProduto(produtoDiv) {
  const get = (selector) => {
    const el = produtoDiv.querySelector(selector);
    return el ? el.value : null;
  };

  return {
    ram:               get('select[name="ram"]'),
    processadorRyzen:  get('select[name="processador-ryzen"]'),
    processadorIntel:  get('select[name="processador-intel"]'),
    gpu:               get('select[name="NVIDIA RTX"]'),
    placaAMD:          get('select[name="Placa AMD"]'),
    ssd:               get('select[name="SSD NVMe"]'),
  };
}

// ─────────────────────────────────────────────
//  Renderiza o carrinho na tela
// ─────────────────────────────────────────────
function renderCarrinho() {
  const cartEl   = document.getElementById('cart');
  const totalEl  = document.getElementById('total');

  cartEl.innerHTML = '';

  if (cart.length === 0) {
    cartEl.innerHTML = '<li class="cart-vazio">🛒 Carrinho vazio</li>';
    totalEl.textContent = '0,00';
    return;
  }

  let totalGeral = 0;

  cart.forEach((item, index) => {
    totalGeral += item.preco;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.nome}</strong>
        <span class="cart-item-config">${resumoConfig(item.config)}</span>
      </div>
      <div class="cart-item-preco">
        R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        <button class="btn-remover" onclick="removerItem(${index})" title="Remover">✕</button>
      </div>
    `;
    cartEl.appendChild(li);
  });

  totalEl.textContent = totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// ─────────────────────────────────────────────
//  Gera resumo legível da configuração
// ─────────────────────────────────────────────
function resumoConfig(config) {
  const partes = [];
  if (config.ram)              partes.push(`RAM: ${config.ram.toUpperCase()}`);
  if (config.processadorRyzen) partes.push(`CPU: ${config.processadorRyzen}`);
  if (config.processadorIntel) partes.push(`CPU: ${config.processadorIntel}`);
  if (config.gpu)              partes.push(`GPU: ${config.gpu}`);
  if (config.placaAMD)         partes.push(`GPU: ${config.placaAMD}`);
  if (config.ssd)              partes.push(`SSD: ${config.ssd.toUpperCase()}`);
  return partes.join(' • ');
}

// ─────────────────────────────────────────────
//  Adiciona item ao carrinho
// ─────────────────────────────────────────────
function adicionarAoCarrinho(produtoId, produtoDiv) {
  const config = lerConfigProduto(produtoDiv);
  const preco  = calcularPreco(produtoId, config);
  const nome   = precosProdutos[produtoId].nome;

  cart.push({ nome, config, preco, produtoId });
  renderCarrinho();

  // Feedback visual no botão
  const btn = produtoDiv.querySelector('.btn-carrinho');
  if (btn) {
    btn.textContent = '✓ Adicionado!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = 'Adicionar ao Carrinho';
      btn.style.background = '';
    }, 1500);
  }
}

// ─────────────────────────────────────────────
//  Compra direta (adiciona e rola até carrinho)
// ─────────────────────────────────────────────
function comprarAgora(produtoId, produtoDiv) {
  adicionarAoCarrinho(produtoId, produtoDiv);
  document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
}

// ─────────────────────────────────────────────
//  Remove item do carrinho
// ─────────────────────────────────────────────
function removerItem(index) {
  cart.splice(index, 1);
  renderCarrinho();
}

// ─────────────────────────────────────────────
//  Finalizar compra
// ─────────────────────────────────────────────
document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const total = cart.reduce((acc, item) => acc + item.preco, 0);
  const resumo = cart.map(item =>
    `• ${item.nome} — R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  ).join('\n');

  alert(
    `✅ Pedido confirmado!\n\n${resumo}\n\n` +
    `Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n` +
    `Obrigado pela compra! 🚀`
  );

  cart.length = 0;
  renderCarrinho();
});

// ─────────────────────────────────────────────
//  Vincula botões ao carregar a página
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const produtos = document.querySelectorAll('.produto');

  produtos.forEach((div, i) => {
    const produtoId = i + 1;
    const botoes = div.querySelectorAll('button[type="button"]');

    // Adiciona classes para identificar os botões
    if (botoes[0]) {
      botoes[0].classList.add('btn-comprar');
      botoes[0].addEventListener('click', () => comprarAgora(produtoId, div));
    }
    if (botoes[1]) {
      botoes[1].classList.add('btn-carrinho');
      botoes[1].addEventListener('click', () => adicionarAoCarrinho(produtoId, div));
    }
  });

  renderCarrinho();

  // Cada produto tem data-nome e data-tags
// A função filtrar() combina pesquisa de texto + chip ativo
function filtrar() {
    produtos.forEach(p => {
        const texto = (p.dataset.nome + ' ' + p.dataset.tags).toLowerCase();
        const ok = (!term || texto.includes(term)) 
                && (filtro === 'all' || texto.includes(filtro));
        p.classList.toggle('hidden', !ok);
    });
}
  
})