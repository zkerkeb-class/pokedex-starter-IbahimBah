// 📄 frontend/src/pages/EditPokemon.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPokemonById, updatePokemon } from '../services/api';

function EditPokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    type: '',
    hp: '',
    attack: '',
    defense: '',
    spAttack: '',
    spDefense: '',
    speed: '',
    image: ''
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonById(id);
        setForm({
          name: data.name.french || '',
          type: data.type.join(', ') || '',
          hp: data.base?.HP || '',
          attack: data.base?.Attack || '',
          defense: data.base?.Defense || '',
          spAttack: data.base?.['Sp. Attack'] || '',
          spDefense: data.base?.['Sp. Defense'] || '',
          speed: data.base?.Speed || '',
          image: data.image || '',
        });
      } catch (error) {
        console.error('❌ Erreur chargement Pokémon', error);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = {
      id: parseInt(id),
      name: { french: form.name },
      type: form.type.split(',').map((t) => t.trim()),
      image: form.image,
      base: {
        HP: parseInt(form.hp),
        Attack: parseInt(form.attack),
        Defense: parseInt(form.defense),
        'Sp. Attack': parseInt(form.spAttack),
        'Sp. Defense': parseInt(form.spDefense),
        Speed: parseInt(form.speed)
      }
    };

    try {
      await updatePokemon(id, updated);
      alert('✅ Pokémon modifié avec succès !');
      navigate('/');
    } catch (error) {
      console.error('❌ Erreur modification Pokémon', error);
      alert('❌ Modification échouée');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Link to="/">⬅️ Retour à la liste</Link>
      <h2 style={{ textAlign: 'center' }}>✏️ Modifier le Pokémon</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input type="text" name="name" placeholder="Nom (français)" value={form.name} onChange={handleChange} required />
        <input type="text" name="type" placeholder="Types (ex: Fire, Flying)" value={form.type} onChange={handleChange} required />
        <input type="text" name="image" placeholder="URL de l'image" value={form.image} onChange={handleChange} required />

        <input type="number" name="hp" placeholder="PV (HP)" value={form.hp} onChange={handleChange} required />
        <input type="number" name="attack" placeholder="Attaque" value={form.attack} onChange={handleChange} required />
        <input type="number" name="defense" placeholder="Défense" value={form.defense} onChange={handleChange} required />
        <input type="number" name="spAttack" placeholder="Attaque Spéciale" value={form.spAttack} onChange={handleChange} required />
        <input type="number" name="spDefense" placeholder="Défense Spéciale" value={form.spDefense} onChange={handleChange} required />
        <input type="number" name="speed" placeholder="Vitesse" value={form.speed} onChange={handleChange} required />

        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>💾 Enregistrer</button>
      </form>
    </div>
  );
}

export default EditPokemon;

