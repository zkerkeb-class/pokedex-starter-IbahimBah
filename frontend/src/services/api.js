import axios from 'axios';

// ✅ URL de base avec le bon port (4001)
const API_URL = 'http://localhost:4001/api/pokemons';

// 🔑 (Optionnel) Fonction pour gérer les headers si tu remets l'auth plus tard
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🔍 Obtenir tous les Pokémon (Public)
export const getAllPokemons = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔍 Obtenir un Pokémon par ID (Public)
export const getPokemonById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ➕ Créer un nouveau Pokémon (Sans Authentification)
export const createPokemon = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// ✏️ Mettre à jour un Pokémon (Sans Authentification)
export const updatePokemon = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// ❌ Supprimer un Pokémon (Sans Authentification)
export const deletePokemon = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

