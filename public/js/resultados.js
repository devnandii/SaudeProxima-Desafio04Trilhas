function exibirResultados(unidades) {
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  unidades.forEach(unidade => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <div class="unidade-info">
        <h3>${unidade.nome}</h3>
        <p>${unidade.endereco}</p>
        <p>📞 ${unidade.telefone}</p>
        <p>⏰ ${unidade.horario_funcionamento}</p>
        <p>📍 ${Math.round(unidade.distancia)} metros</p>
        <button onclick="abrirRota(${unidade.lat}, ${unidade.lng})">
          🗺️ Como chegar
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function abrirRota(lat, lng) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
}
