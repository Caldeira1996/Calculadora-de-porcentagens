import React, { useState } from 'react';
import Resultado from './Resultado';

interface AnoResultado {
  ano: number;
  patrimonio: number;
  rendaMensal: number;
}

const Formulario: React.FC = () => {
  const [valorInicial, setValorInicial] = useState<string>('');
  const [aporteMensal, setAporteMensal] = useState<string>('');
  const [prazoTipo, setPrazoTipo] = useState<'anos' | 'meses'>('anos');
  const [prazoValor, setPrazoValor] = useState<string>('');
  const [taxa, setTaxa] = useState<string>('');
  const [resultados, setResultados] = useState<AnoResultado[]>([]);
  const [aporteMensalNum, setAporteMensalNum] = useState(0);
  const [anos, setAnos] = useState(0);
  const [mesesTotais, setMesesTotais] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valorInicialNum = Number(valorInicial) || 0;
    const aporteMensalNum = Number(aporteMensal) || 0;
    const prazoValorNum = Number(prazoValor) || 0;
    const taxaNum = Number(taxa) || 0;

    const mesesTotais = prazoTipo === 'anos' ? prazoValorNum * 12 : prazoValorNum;
    const taxaMensal = Math.pow(1 + taxaNum / 100, 1 / 12) - 1;

    let saldo = valorInicialNum;
    const resultadoAnual: AnoResultado[] = [];

    for (let mes = 1; mes <= mesesTotais; mes++) {
      saldo = saldo * (1 + taxaMensal) + aporteMensalNum;

      if (mes % 12 === 0 || mes === mesesTotais) {
        const ano = Math.floor(mes / 12) + (mes === mesesTotais && mesesTotais % 12 !== 0 ? 1 : 0);
        resultadoAnual.push({
          ano,
          patrimonio: saldo,
          rendaMensal: saldo * (taxaNum / 100) / 12,
        });
      }
    }

    setResultados(resultadoAnual);
    setAporteMensalNum(aporteMensalNum);
    setMesesTotais(mesesTotais);
    setAnos(mesesTotais / 12);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Valor da carteira (R$):</label>
          <input
            type="number"
            value={valorInicial}
            onChange={(e) => setValorInicial(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Aportes mensais (R$):</label>
          <input
            type="number"
            value={aporteMensal}
            onChange={(e) => setAporteMensal(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Prazo de investimento:</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select
              value={prazoTipo}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const val = e.target.value;
                if (val === 'anos' || val === 'meses') setPrazoTipo(val);
              }}
            >
              <option value="anos">Anos</option>
              <option value="meses">Meses</option>
            </select>

            <input
              type="number"
              value={prazoValor}
              onChange={(e) => setPrazoValor(e.target.value)}
              placeholder={`Quantidade de ${prazoTipo}`}
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Taxa de retorno anual (%):</label>
          <input
            type="number"
            step="0.01"
            value={taxa}
            onChange={(e) => setTaxa(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <button type="submit">Calcular</button>
      </form>

      {resultados.length > 0 && (
        <Resultado 
          resultados={resultados} 
          aporteMensal={aporteMensalNum} 
          anos={anos} 
          valorInicial={Number(valorInicial)} 
          mesesTotais={mesesTotais}
        />
      )}
    </>
  );
};

export default Formulario;
