// Função para carregar os tipos de estabelecimento e especialidades
async function carregarDadosDosBancos() {
  try {
    // Carregar tipos de estabelecimento
    const resTipos = await fetch('/api/tipos');
    if (!resTipos.ok) throw new Error('Erro ao carregar tipos');
    const tipos = await resTipos.json();
    
    // Carregar especialidades
    const resEspecialidades = await fetch('/api/especialidades');
    if (!resEspecialidades.ok) throw new Error('Erro ao carregar especialidades');
    const especialidades = await resEspecialidades.json();
    
    // Popular select de tipos
    const tipoSelect = document.getElementById('tipo');
    tipoSelect.innerHTML = '<option value="">Todos os tipos</option>';
    tipos.forEach(tipo => {
      tipoSelect.innerHTML += `<option value="${tipo.id}">${tipo.nome}</option>`;
    });
    
    // Popular select de especialidades
    const especialidadeSelect = document.getElementById('especialidade');
    especialidadeSelect.innerHTML = '<option value="">Qualquer especialidade</option>';
    especialidades.forEach(esp => {
      especialidadeSelect.innerHTML += `<option value="${esp.id}">${esp.nome}</option>`;
    });
    
  } catch (error) {
    console.error('Falha ao carregar dados:', error);
  }
}

// Função para converter endereço em coordenadas
async function obterCoordenadasPorEndereco(endereco) {
  try {
    const response = await fetch(`/api/geocodificar?endereco=${encodeURIComponent(endereco)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || 'Falha na requisição');
    }

    const data = await response.json();
    
    if (!data.lat || !data.lng) {
      throw new Error('Coordenadas inválidas');
    }

    return data;

  } catch (error) {
    console.error('Erro na geolocalização:', error);
    throw error; // Propaga o erro para ser tratado no caller
  }
}

// Função principal de busca
async function buscarUnidades(e) {
  e.preventDefault();
  
  const endereco = document.getElementById('endereco').value.trim();
  const tipo = document.getElementById('tipo').value;
  const especialidade = document.getElementById('especialidade').value;
  const raio = document.getElementById('distancia').value;

  const resultsContainer = document.querySelector('.results-container');
  resultsContainer.innerHTML = '<div class="loading">Buscando unidades próximas...</div>';

  try {
    if (!endereco) {
      throw new Error('Por favor, digite um endereço válido');
    }

    const coords = await obterCoordenadasPorEndereco(endereco);
    
    const params = new URLSearchParams({
      lat: coords.lat,
      lng: coords.lng,
      raio,
      ...(tipo && { tipo }),
      ...(especialidade && { especialidade })
    });

    const response = await fetch(`/api/busca?${params}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || 'Erro na busca');
    }

    const unidades = await response.json();
    
    if (unidades.length === 0) {
      resultsContainer.innerHTML = '<div class="no-results">Nenhuma unidade encontrada</div>';
      return;
    }

    exibirResultados(unidades);

  } catch (error) {
    console.error('Erro na busca:', error);
    resultsContainer.innerHTML = `<div class="error">${error.message}</div>`;
  }
}

// Função para exibir resultados
function exibirResultados(unidades) {
  const container = document.querySelector('.results-container');
  container.innerHTML = '';

  if (unidades.length === 0) {
    container.innerHTML = '<div class="no-results">Nenhuma unidade encontrada</div>';
    return;
  }

  unidades.forEach(unidade => {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    card.innerHTML = `
      <div class="card-header">
        <h3>${unidade.nome}</h3>
        <span class="distance">${(unidade.distancia/1000).toFixed(2)} km</span>
      </div>
      <div class="card-body">
        <p class="address">${unidade.endereco}</p>
        <div class="details">
          ${unidade.telefone ? `<p><strong>Telefone:</strong> ${unidade.telefone}</p>` : ''}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Carregar filtros
  carregarDadosDosBancos();

  // Event listener após DOM carregado
  const formBusca = document.getElementById('form-busca');
  if (formBusca) {
    formBusca.addEventListener('submit', buscarUnidades);
  } else {
    console.error('Elemento #form-busca não encontrado!');
  }
});
