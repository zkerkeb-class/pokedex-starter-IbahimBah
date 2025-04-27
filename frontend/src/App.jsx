import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchPokemons } from './services/pokemonService';
import { deletePokemon } from './services/api';
import { motion } from 'framer-motion';

const POKEMON_TYPES = [
  '', 'Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug',
  'Normal', 'Electric', 'Ground', 'Fairy', 'Fighting',
  'Psychic', 'Rock', 'Steel', 'Ice', 'Dragon', 'Ghost'
];

const POKEMONS_PER_PAGE = 6;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPokemons();
        console.log('✅ Pokémons chargés depuis l’API :', data); // 🔍 Vérifie ce que tu reçois
        console.log('🔎 Détails d’un Pokémon:', data[0]); // 🔎 Voir la structure d'un Pokémon
        setPokemons(data);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des Pokémons', error);
      }
    };

    loadData();
  }, [location]);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce Pokémon ?')) return;
    try {
      await deletePokemon(id);
      setPokemons((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // On désactive temporairement le filtre ici pour test
  const totalPages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE);
  const indexOfLast = currentPage * POKEMONS_PER_PAGE;
  const indexOfFirst = indexOfLast - POKEMONS_PER_PAGE;
  const currentPokemons = pokemons.slice(indexOfFirst, indexOfLast);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 🔒 Bouton Logout */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 14px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔓 Déconnexion
        </button>
      </div>

      <h1 style={{ textAlign: 'center' }}>Liste des Pokémons</h1>

      {/* ➕ Ajouter un Pokémon */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to="/create">
          <button style={{ padding: '10px 20px', fontSize: '16px' }}>
            ➕ Ajouter un Pokémon
          </button>
        </Link>
      </div>

      {/* 🔍 Recherche + 🧩 Filtre alignés */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ flex: 2, padding: '8px' }}
        />

        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          style={{ flex: 1, padding: '8px' }}
        >
          <option value="">-- Filtrer par type --</option>
          {POKEMON_TYPES.filter(Boolean).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Liste des Pokémons avec animation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {currentPokemons.map((pokemon) => (
          <motion.div
            key={pokemon.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              textAlign: 'center',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <img src={pokemon.image} alt={pokemon.name.french} style={{ width: '96px', height: '96px' }} />
            <h4>
              <Link to={`/pokemon/${pokemon.id}`}>
                {pokemon.name.french}
              </Link>
            </h4>
            <p>#{pokemon.id}</p>
            <div>
              <Link to={`/edit/${pokemon.id}`}>✏️ Modifier</Link>
            </div>
            <div>
              <button style={{ color: 'red' }} onClick={() => handleDelete(pokemon.id)}>🗑️ Supprimer</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>⬅️ Précédent</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant ➡️</button>
      </div>
    </div>
  );
}

export default App;

