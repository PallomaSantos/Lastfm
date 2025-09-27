import React, { useEffect, useState } from "react";
import api from "../services/ApiLastfm";

export default function LastfmList() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const artists = await api.getItems("Coldplay");

        const details = await Promise.all(
          artists.map(async (artist) => {
            const info = await api.getItemById(artist.name);
            return {
              name: artist.name,
              listeners: info.artist.stats?.listeners || "N/A",
              url: artist.url
            };
          })
        );

        setItens(details);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar artistas");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Artistas</h2>
      {itens.map((item) => (
        <div key={item.name} style={{ marginBottom: "10px" }}>
          <strong>{item.name}</strong> - {item.listeners} ouvintes<br />
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Ver no Last.fm
          </a>
        </div>
      ))}
    </div>
  );
}
