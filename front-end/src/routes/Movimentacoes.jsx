import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api.js"
const Movimentacoes = () => {
    //get movimentacoes
    const [dados, setDados] = useState([])
    async function getDados() {

        try {
            const dadosFromApi = (await api.get('/consulta')).data
            setDados(dadosFromApi)
        } catch (error) {
            alert("Erro ao consultar, tente novamente")
            console.error("Erro ao consultar os dados:", error);
        }
    }
    function formatoReal(valor){

        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return (
        <div>
            <h1>Movimentações</h1>
            <div>
                <button className="btn btn-primary btn-lg" onClick={getDados}>Carregar dados</button>
                <table className="table-transparent table rounded-3 mt-3" border="1">
                    <thead>
                        <tr>
                            <th className="col">#</th>
                            <th className="col">Data</th>
                            <th className="col">Situação</th>
                            <th className="col">Produto</th>
                            <th className="col">Peso</th>
                            <th className="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((item, index) => (
                            <tr key={item.id}>
                                <th>{index}</th>
                                <td>{item.data}</td>
                                <td>{item.situacao}</td>
                                <td>{item.produto}</td>
                                <td>{item.peso} Kg</td>
                                <td>{formatoReal(item.valor)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Movimentacoes;