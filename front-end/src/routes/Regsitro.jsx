import { useState } from 'react'
import api from '../../services/api.js'

function App() {

  //Formatação e envio de dados do form para o banco de dados
  const [formData, setFormData] = useState({
    data: "",
    situacao: "",
    produto: "",
    peso: "",
    valor: ""
  })

  const handleChange = (event) => {
    const { name, value, type } = event.target

    setFormData((prevData) => ({
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
    } catch (error) {
      alert("Erro ao enviar, tente novamente")
      console.error("Erro ao registrar os dados:", error);
    }
  }


  return (
    <>
        <h1 className='mt-5 mb-5'>Registro de Movimentação</h1>
        <form onSubmit={handleSubmit} className='row g-3 justify-content-center'>
          <div className="row justify-content-center mb-3">
            <div className='col-md-6'>
              <label htmlFor="input-data" className='form-label'>
                Data
              </label>
              <input id='input-data' className='form-control' type="date" name='data' value={formData.data} onChange={handleChange} required />
            </div>
          </div>
          <div className="row mb-3">
            <fieldset className='col-md-6 text-center fs-4'>
              <legend className='fs-2'>Situação:</legend>
              <div className='d-flex justify-content-center gap-3'>
                <label htmlFor='input-entrada' className=''>
                  Entrada
                </label>
                <input id='input-entrada' type="radio" name="situacao" value="entrada" checked={formData.situacao === "entrada"} onChange={handleChange} required />
              </div>
              <div className='d-flex justify-content-center gap-3'>
                <label htmlFor='input-saida' className=''>
                  Saída
                </label>
                <input id='input-saida' type="radio" name="situacao" value="saida" checked={formData.situacao === "saida"} onChange={handleChange} required />
              </div>
            </fieldset>
            <fieldset className='col-md-6 text-center fs-4'>
              <legend className='fs-2'>Produto:</legend>
              <div className='d-flex justify-content-center gap-3'>
                <label htmlFor='input-morango'>
                  Morango
                </label>
                <input id='input-morango' type="radio" name="produto" value="morango" checked={formData.produto === "morango"} onChange={handleChange} required />
              </div>
              <div className='d-flex justify-content-center gap-3'>
                <label htmlFor="input-tomate">Tomate</label>
                <input id='input-tomate' type="radio" name="produto" value="tomate" checked={formData.produto === "tomate"} onChange={handleChange} required />
              </div>
            </fieldset>
          </div>
          <div className="row">
            <div className='col-md-6'>
              <label htmlFor="input-peso" className='form-label'>
                Peso(Kg)
              </label>
              <input id='input-peso' className='form-control' type="number" name='peso' value={formData.peso} onChange={handleChange} required />
            </div>
            <div className='col-md-6'>
              <label htmlFor="input-valor" className='form-label'>
                Valor(R$)
              </label>
              <input id='input-valor' className='form-control' type="number" name='valor' value={formData.valor} onChange={handleChange}  required />
            </div>
          </div>
          <div className='row justify-content-center mt-5 mb-5'>
            <button className='btn btn-primary col-md-6' type='submit'>Registrar</button>
          </div>
        </form>

    </>
  )
}

export default App
