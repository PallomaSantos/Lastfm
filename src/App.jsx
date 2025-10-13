import { useState } from "react";
import api from "./services/ApiLastfm";
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

    const data = await api.getItems(artistName);

    setArtists(data);
    setLoading(false); 
  }

  return (
    <div className="container">
      <h1>🎧 Buscar Artistas - Last.fm</h1>

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


      <div className="grid">
        {artists.map((artist) => (

          <div className="card" key={artist.mbid || artist.name}>
            <img
              src={artist.image?.[3]?.["#text"] || "https://placehold.co/180x180?text=Sem+Foto"}
              alt={artist.name}
              loading="lazy"
            />
            <h3>{artist.name}</h3>
            <p>👥 {Number(artist.listeners).toLocaleString('pt-BR')} ouvintes</p>
          </div>
        ))}
      </div>
    </div>
  );
}