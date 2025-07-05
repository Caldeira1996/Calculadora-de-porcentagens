import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Portal de Aplicativos</h1>
      <ul>
        <li><Link to="/calculadora">Calculadora de Dividendos</Link></li>
        {/* Aqui você pode adicionar mais links para outros apps */}
      </ul>
    </div>
  );
};

export default Home;