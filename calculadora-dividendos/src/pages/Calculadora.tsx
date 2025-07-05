import React from 'react';
import Formulario from '../components/Formulario';
import '../pages/Calculadora.css'

const Calculadora: React.FC = () => {
  return (
    <div className="calculadora-container">
      <h1>Calculadora de Dividendos</h1>
      <Formulario />
    </div>
  );
};

export default Calculadora;
