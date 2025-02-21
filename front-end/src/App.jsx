import { useState, useEffect } from 'react'
import './App.css'
import api from '../services/api.js'
import axios from 'axios'

function App() {

  //configs do axios
  const [dados, setDados] = useState([])

  async function getDados() {

    try{
      const dadosFromApi = (await api.get('/consulta')).data
    setDados(dadosFromApi)
    }catch (error){
      alert("Erro ao consultar, tente novamente")
      console.error("Erro ao consultar os dados:", error);
    }
  }

  const [formData, setFormData] = useState({
    data: "",
    situacao: "",
    produto: "",
    peso: "",
    valor: ""
  })

  const handleChange = (event) => {
    const {name, value, type} = event.target

    setFormData((prevData)=>({
      ...prevData,
      [name]: type === "number" ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    try {
      await api.post('/cadastrar', formData)
      alert('Registro efetuado com sucesso!')
    }catch (error) {
      alert("Erro ao enviar, tente novamente")
      console.error("Erro ao registrar os dados:", error);
    }
  }


  return (
    <>
      <h1>Gestão de Estoque</h1>
      <form onSubmit={handleSubmit}>
        <div className='div-inputs'>
          <label>
            Data
            <input type="date" name='data' value={formData.data} onChange={handleChange} required />
          </label>
        </div>
        <fieldset>
          <legend>Situação:</legend>
          <label>
            <input type="radio" name="situacao" value="entrada" checked={formData.situacao === "entrada"} onChange={handleChange} required />
            Entrada
          </label>
          <label>
            <input type="radio" name="situacao" value="saida" checked={formData.situacao === "saida"} onChange={handleChange} required />
            Saída
          </label>
        </fieldset>
        <fieldset>
          <legend>Produto:</legend>
          <label>
            <input type="radio" name="produto" value="morango" checked={formData.produto === "morango"} onChange={handleChange} required />
            Morango
          </label>
          <label>
            <input type="radio" name="produto" value="tomate" checked={formData.produto === "tomate"} onChange={handleChange} required />
            Tomate
          </label>
        </fieldset>
        <div className='div-inputs'>
          <label>
            Peso(Kg)
            <input type="number" name='peso' value={formData.peso} onChange={handleChange} min={0} required />
          </label>
        </div>
        <div className='div-inputs'>
          <label>
            Valor(R$)
            <input type="number" name='valor' value={formData.valor} onChange={handleChange} min={0} required />
          </label>
        </div>
        <button type='submit'>Registrar</button>
      </form>
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
    </>
  )
}

export default App
