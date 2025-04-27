import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import PokemonDetail from './pages/PokemonDetail';
import CreatePokemon from './pages/CreatePokemon';
import EditPokemon from './pages/EditPokemon';
import Login from './pages/Login';

// Composant pour protéger les routes privées
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
      <Route
        path="/pokemon/:id"
        element={
          <PrivateRoute>
            <PokemonDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePokemon />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditPokemon />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

