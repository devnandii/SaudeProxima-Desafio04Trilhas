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

// Carregar os dados quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarDadosDosBancos);
