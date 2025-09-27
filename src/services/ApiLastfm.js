import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

async function getItems(artist) {
  const res = await fetch(
    `${BASE_URL}?method=artist.search&artist=${artist}&api_key=${API_KEY}&format=json`
  );
  const data = await res.json();
  return data.results.artistmatches.artist;
}

async function getItemById(artist) {
  const res = await fetch(
    `${BASE_URL}?method=artist.getinfo&artist=${artist}&api_key=${API_KEY}&format=json`
  );
  return await res.json();
}

export default { getItems, getItemById };
