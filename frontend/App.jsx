import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPokemons } from './services/pokemonService';
import { deletePokemon } from './services/api';
import { motion } from 'framer-motion';

const POKEMONS_PER_PAGE = 12;
const POKEMON_TYPES = [
  '', 'Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug',
  'Normal', 'Electric', 'Ground', 'Fairy', 'Fighting',
  'Psychic', 'Rock', 'Steel', 'Ice', 'Dragon', 'Ghost'
];

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPokemons();
        setPokemons(data);
        console.log('✅ Données chargées :', data);
      } catch (error) {
        console.error('Erreur lors du chargement des Pokémon', error);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce Pokémon ?')) return;
    try {
      await deletePokemon(id);
      setPokemons((prev) => prev.filter((p) => p.id !== id));
      alert('✅ Pokémon supprimé !');
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  // 🔍 Filtrage + Recherche
  const filteredPokemons = pokemons.filter((p) => {
    const name = p.name?.french?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const typeMatch = selectedType === '' || (Array.isArray(p.type) && p.type.includes(selectedType));
    const result = name.includes(search) && typeMatch;

    console.log(`🔎 Nom: ${name}, Recherche: ${search}, Type Match: ${typeMatch} => ${result}`);
    return result;
  });

  const indexOfLast = currentPage * POKEMONS_PER_PAGE;
  const indexOfFirst = indexOfLast - POKEMONS_PER_PAGE;
  const currentPokemons = filteredPokemons.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredPokemons.length / POKEMONS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Liste des Pokémon</h1>

      {/* 🔍 Recherche & Filtre */}
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

      {/* Liste */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {currentPokemons.map((pokemon) => (
          <motion.div
            key={pokemon.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '150px',
              textAlign: 'center',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name?.french || `pokemon-${pokemon.id}`}
              style={{ width: '100px', height: '100px' }}
            />
            <h4>{pokemon.name?.french || 'Inconnu'}</h4>
            <p>#{pokemon.id}</p>
            <p><strong>Type:</strong> {pokemon.type?.join(', ') || 'Inconnu'}</p>

            {/* Actions */}
            <div>
              <Link to={`/edit/${pokemon.id}`}>✏️ Modifier</Link>
            </div>
            <div>
              <button onClick={() => handleDelete(pokemon.id)} style={{ color: 'red' }}>🗑️ Supprimer</button>
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

