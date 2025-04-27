import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPokemon } from '../services/api';

const POKEMON_TYPES = [
  'Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug',
  'Normal', 'Electric', 'Ground', 'Fairy', 'Fighting',
  'Psychic', 'Rock', 'Steel', 'Ice', 'Dragon', 'Ghost'
];

function CreatePokemon() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    type: [],
    hp: '',
    attack: '',
    defense: '',
    spAttack: '',
    spDefense: '',
    speed: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm((prev) => ({ ...prev, type: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPokemon = {
      name: { french: form.name },
      type: form.type,
      image: form.image,
      base: {
        HP: parseInt(form.hp),
        Attack: parseInt(form.attack),
        Defense: parseInt(form.defense),
        'Sp. Attack': parseInt(form.spAttack),
        'Sp. Defense': parseInt(form.spDefense),
        Speed: parseInt(form.speed),
      },
    };

    try {
      await createPokemon(newPokemon);
      alert('✅ Pokémon créé avec succès !');
      navigate('/');
    } catch (error) {
      console.error('❌ Erreur lors de la création', error);
      alert('❌ Erreur lors de la création du Pokémon');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>➕ Ajouter un nouveau Pokémon</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input type="text" name="name" placeholder="Nom (français)" value={form.name} onChange={handleChange} required />
        
        <select multiple name="type" value={form.type} onChange={handleTypeChange} required style={{ height: '100px' }}>
          {POKEMON_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <input type="number" name="hp" placeholder="PV (HP)" value={form.hp} onChange={handleChange} required />
        <input type="number" name="attack" placeholder="Attaque" value={form.attack} onChange={handleChange} required />
        <input type="number" name="defense" placeholder="Défense" value={form.defense} onChange={handleChange} required />
        <input type="number" name="spAttack" placeholder="Attaque Spéciale" value={form.spAttack} onChange={handleChange} required />
        <input type="number" name="spDefense" placeholder="Défense Spéciale" value={form.spDefense} onChange={handleChange} required />
        <input type="number" name="speed" placeholder="Vitesse" value={form.speed} onChange={handleChange} required />
        
        <input type="text" name="image" placeholder="URL de l'image" value={form.image} onChange={handleChange} required />

        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>✅ Créer</button>
      </form>
    </div>
  );
}

export default CreatePokemon;

