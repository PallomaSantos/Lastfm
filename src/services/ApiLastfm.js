const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

/**
 * Busca artistas na API da Last.fm.
 * @param {string} artistName - O nome do artista para buscar.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de artistas.
 */
async function getItems(artistName) {
  try {
    const url = `${BASE_URL}?method=artist.search&artist=${encodeURIComponent(
      artistName
    )}&api_key=${API_KEY}&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.results?.artistmatches?.artist || [];

  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    return [];
  }
}

export default { getItems };