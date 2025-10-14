import { useState } from "react";
import api from "./services/ApiLastfm";
import LastfmList from "./components/LastfmList";
import lastfmLogo from './assets/lastfmLogo.png';
import "./App.css";


export default function App() {
  const [artistName, setArtistName] = useState("");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    if (!artistName.trim()) {
      alert("Por favor, digite o nome de um artista.");
      return;
    }

    setLoading(true);
    setArtists([]); 

    try {
      const data = await api.getItems(artistName);
      setArtists(data);
    } catch (err) {
      console.error("Erro ao buscar artistas", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <img className="logoApp" src={lastfmLogo} alt="LastFM Logo" />
      <h1>Buscar Artistas - Last.fm</h1>
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="Digite o nome do artista..."
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {loading && <p className="loading-message">Carregando...</p>}

      {artists.length > 0 && !loading && <LastfmList artists={artists} />}
    </div>
  );
}
