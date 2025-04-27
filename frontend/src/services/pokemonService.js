// frontend/src/services/pokemonService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api'; // 🔥 Vérifie bien que ton backend tourne sur 4000 !

export const fetchPokemons = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemons`);
    console.log('✅ Réponse API:', response.data); // Pour vérifier que les données arrivent bien
    return response.data;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des Pokémon :', error.response ? error.response.data : error.message);
    throw error;
  }
};

