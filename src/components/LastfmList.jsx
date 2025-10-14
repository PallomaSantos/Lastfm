import React, { useEffect, useState } from "react";
import api from "../services/ApiLastfm";

export default function LastfmList({ artists }) {
  const [detailedArtists, setDetailedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);


        const details = await Promise.all(
          artists.map(async (artist) => {
            const info = await api.getItemById(artist.name);  
            return {
              name: artist.name,
              listeners: info.stats?.listeners || "N/A",
              url: artist.url,
            };
          })
        );

        setDetailedArtists(details);
      } catch (err) {
        console.error("Erro ao buscar detalhes dos artistas", err);
        setError("Erro ao buscar detalhes dos artistas");
      } finally {
        setLoading(false);
      }
    }

    if (artists.length > 0) {
      fetchData();
    }
  }, [artists]); 

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid">
      {detailedArtists.map((artist) => (
        <div className="card" key={artist.name}>
          <h3>{artist.name}</h3>
          <p>{Number(artist.listeners).toLocaleString('pt-BR')} ouvintes</p>
          <br></br>
          <a href={artist.url} target="_blank" rel="noopener noreferrer">
            Ver mais
          </a>
        </div>
      ))}
    </div>
  );
}
