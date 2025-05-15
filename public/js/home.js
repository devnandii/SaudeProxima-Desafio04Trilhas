let map;
let markers = [];

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: -23.5505, lng: -46.6333 },
    zoom: 12,
    mapId: "DEMO_MAP_ID"
  });
}

async function buscarUnidades() {
  const endereco = document.getElementById('endereco').value;
  
  try {
    // Geocodificação
    const { results: [geoData] } = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    ).then(res => res.json());

    const { location } = geoData.geometry;
    
    // Busca unidades
    const unidades = await fetch(`/api/busca?lat=${location.lat}&lng=${location.lng}`)
      .then(res => res.json());

    exibirResultados(unidades);
    plotarMarcadores(unidades);
    
  } catch (error) {
    console.error("Erro na busca:", error);
  }
}

function plotarMarcadores(unidades) {
  // Limpa marcadores anteriores
  markers.forEach(marker => marker.setMap(null));
  markers = [];

  unidades.forEach(unidade => {
    const marker = new google.maps.Marker({
      position: { lat: unidade.lat, lng: unidade.lng },
      map,
      title: unidade.nome
    });
    
    markers.push(marker);
  });

  if (unidades.length > 0) {
    map.setCenter(markers[0].getPosition());
  }
}
