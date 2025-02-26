import React from "react";
import { useState } from "react";
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
    return (
        <div>
            <h1>Movimentações</h1>
            <div>
                <button onClick={getDados}>Carregar dados</button>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Situação</th>
                            <th>Produto</th>
                            <th>Peso</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((item) => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.situacao}</td>
                                <td>{item.produto}</td>
                                <td>{item.peso}</td>
                                <td>{item.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Movimentacoes;