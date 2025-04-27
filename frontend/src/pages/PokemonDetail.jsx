import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonById } from '../services/api';
import Loader from '../components/Loader'; // ✅ Nouveau

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonById(id);
        setPokemon(data);
      } catch (error) {
        console.error('Erreur lors du chargement du Pokémon', error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemon) return <Loader />; // ✅ Animation pendant chargement

  const badgeStyle = (type) => ({
    display: 'inline-block',
    padding: '4px 10px',
    margin: '4px',
    backgroundColor: getTypeColor(type),
    color: '#fff',
    borderRadius: '20px',
    fontSize: '14px'
  });

  const getTypeColor = (type) => {
    const colors = {
      Grass: '#78C850',
      Poison: '#A040A0',
      Fire: '#F08030',
      Flying: '#A890F0',
      Water: '#6890F0',
      Bug: '#A8B820',
      Normal: '#A8A878',
      Electric: '#F8D030',
      Ground: '#E0C068',
      Fairy: '#EE99AC',
      Fighting: '#C03028',
      Psychic: '#F85888',
      Rock: '#B8A038',
      Steel: '#B8B8D0',
      Ice: '#98D8D8',
      Dragon: '#7038F8',
      Ghost: '#705898'
    };
    return colors[type] || '#777';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>⬅️ Retour à la liste</Link>
      <h2 style={{ textAlign: 'center' }}>{pokemon.name.french}</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={pokemon.image}
          alt={pokemon.name.french}
          style={{ width: '160px', height: '160px' }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {pokemon.type.map((type) => (
          <span key={type} style={badgeStyle(type)}>{type}</span>
        ))}
      </div>

      <div style={{ lineHeight: '1.8', fontSize: '16px' }}>
        <p><strong>PV :</strong> {pokemon.base?.HP}</p>
        <p><strong>Attaque :</strong> {pokemon.base?.Attack}</p>
        <p><strong>Défense :</strong> {pokemon.base?.Defense}</p>
        <p><strong>Attaque Spéciale :</strong> {pokemon.base?.['Sp. Attack']}</p>
        <p><strong>Défense Spéciale :</strong> {pokemon.base?.['Sp. Defense']}</p>
        <p><strong>Vitesse :</strong> {pokemon.base?.Speed}</p>
      </div>
    </div>
  );
}

export default PokemonDetail;

