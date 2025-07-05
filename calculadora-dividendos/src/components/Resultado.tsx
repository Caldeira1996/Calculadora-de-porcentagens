import React from 'react';
import './Resultado.css'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface AnoResultado {
  ano: number;
  patrimonio: number;
  rendaMensal: number;
}

interface Props {
  resultados: AnoResultado[];
  aporteMensal: number;
  anos: number;
  valorInicial: number;
  mesesTotais: number;
}

const Resultado: React.FC<Props> = ({ resultados, aporteMensal, anos, valorInicial }) => {
  if (!resultados || resultados.length === 0) return null;

  const aporteTotal = valorInicial + aporteMensal * 12 * anos;
  const ultimoAno = resultados[resultados.length - 1];
  const jurosCompostos = ultimoAno.patrimonio - aporteTotal;

  const data = {
    labels: resultados.map((r) => `Ano ${r.ano}`),
    datasets: [
      {
        label: 'Patrimônio (R$)',
        data: resultados.map((r) => r.patrimonio),
        fill: false,
        borderColor: 'blue',
        yAxisID: 'patrimonio',
      },
      {
        label: 'Renda mensal (R$)',
        data: resultados.map((r) => r.rendaMensal),
        fill: false,
        borderColor: 'green',
        yAxisID: 'rendaMensal',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      patrimonio: {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'Patrimônio (R$)' },
      },
      rendaMensal: {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Renda Mensal (R$)' },
        grid: { drawOnChartArea: false },
      },
    },
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  return (
    <div className="resultado">
      <h2>Resultado Final</h2>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
        <p>
          <strong>💼 Patrimônio final:</strong>{' '}
          <span className="valor-azul">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ultimoAno.patrimonio)}
          </span>
        </p>
        <p>
          <strong>📈 Renda passiva mensal:</strong>{' '}
          <span className="valor-verde">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ultimoAno.rendaMensal)}
          </span>
        </p>
        <p>
            <strong>💸 Total investido (do bolso):</strong>{' '}
            <span className="valor-red">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(aporteTotal)}
          </span>
        </p>

        <p>
          <strong>🧪 Ganho com juros compostos:</strong>{' '}
          <span className="valor-amarelo">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(jurosCompostos)}
          </span>
        </p>
      </div>

      <div className="grafico-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>

  );
};

export default Resultado;
