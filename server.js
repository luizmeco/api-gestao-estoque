import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { parse } from "dotenv";

const prisma = new PrismaClient();

var app = express();
app.use(express.json());
app.use(cors());

//Rotas de consulta dos dados

app.get("/", async (req, res) => {
  var listaMovimentacoes = await prisma.gastos.findMany();
  res.send(listaMovimentacoes);
});

app.get("/gastos", async (req, res) => {
  var listaMovimentacoes = await prisma.gastos.findMany({
    orderBy: {
      data: "desc",
    },
  });
  res.json(listaMovimentacoes);
});

app.get("/producao", async (req, res) => {
  var listaMovimentacoes = await prisma.producao.findMany({
    orderBy: {
      data: "desc",
    },
  });
  res.json(listaMovimentacoes);
});

app.get("/vendas", async (req, res) => {
  var listaMovimentacoes = await prisma.vendas.findMany();
  res.json(listaMovimentacoes);
});

//Rotas de registro
app.post("/registroGastos", async (req, res) => {
  const dataYMD = req.body.data;

  // 1. Criar um objeto Date a partir da string yyyy-mm-dd
  // Por padrão, o JavaScript interpreta 'YYYY-MM-DD' como UTC (meia-noite)
  const dataObjeto = new Date(dataYMD);

  // 2. Converter o objeto Date para a string ISO 8601
  // O método .toISOString() retorna a data no formato ISO 8601 em UTC
  const dataISO = dataObjeto.toISOString();
  await prisma.gastos.create({
    data: {
      data: dataISO,
      produto: req.body.produto,
      qtd: req.body.qtd,
      valor_unitario: req.body.valor_unitario,
    },
  });
  res.status(200).send('Item registrado com sucesso!');
});

app.post("/registroVendas", async (req, res) => {
  const dataYMD = req.body.data;
  // 1. Criar um objeto Date a partir da string yyyy-mm-dd
  // Por padrão, o JavaScript interpreta 'YYYY-MM-DD' como UTC (meia-noite)
  const dataObjeto = new Date(dataYMD);

  // 2. Converter o objeto Date para a string ISO 8601
  // O método .toISOString() retorna a data no formato ISO 8601 em UTC
  const dataISO = dataObjeto.toISOString();
  await prisma.vendas.create({
    data: {
      data: dataISO,
      cliente: req.body.cliente,
      produto: req.body.produto,
      tipo: req.body.tipo,
      qtd: req.body.qtd,
      valor_unitario: req.body.valor_unitario,
    },
  });
  res.status(200).send('Item registrado com sucesso!');
});

app.post("/registroProducao", async (req, res) => {
  const dataYMD = req.body.data;

  // 1. Criar um objeto Date a partir da string yyyy-mm-dd
  // Por padrão, o JavaScript interpreta 'YYYY-MM-DD' como UTC (meia-noite)
  const dataObjeto = new Date(dataYMD);

  // 2. Converter o objeto Date para a string ISO 8601
  // O método .toISOString() retorna a data no formato ISO 8601 em UTC
  const dataISO = dataObjeto.toISOString();
  await prisma.producao.create({
    data: {
      data: dataISO,
      estufa: req.body.estufa,
      peso: req.body.peso,
    },
  });
  res.status(200).send('Item registrado com sucesso!');
});


//Rotas de exclusão
app.delete("/deletarGasto/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  await prisma.gastos.delete({
    where: {
      id: userId,
    },
  });
  res.status(200).send('Item excluído com sucesso!');
});

app.delete("/deletarVenda/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  await prisma.vendas.delete({
    where: {
      id: userId,
    },
  });
  res.status(200).send('Item excluído com sucesso!');
});

app.put("/atualizarVenda/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  const dataYMD = req.body.data;
  // 1. Criar um objeto Date a partir da string yyyy-mm-dd
  // Por padrão, o JavaScript interpreta 'YYYY-MM-DD' como UTC (meia-noite)
  const dataObjeto = new Date(dataYMD);

  // 2. Converter o objeto Date para a string ISO 8601
  // O método .toISOString() retorna a data no formato ISO 8601 em UTC
  const dataISO = dataObjeto.toISOString();

  await prisma.vendas.update({
    where: {
      id: userId,
    },
    data: {
      data: dataISO,
      cliente: req.body.cliente,
      produto: req.body.produto,
      tipo: req.body.tipo,
      qtd: req.body.qtd,
      valor_unitario: req.body.valor_unitario,
    },
  });
  res.status(200).send('Item editado com sucesso!');
});

app.put("/atualizarGasto/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  const dataYMD = req.body.data;
  // 1. Criar um objeto Date a partir da string yyyy-mm-dd
  // Por padrão, o JavaScript interpreta 'YYYY-MM-DD' como UTC (meia-noite)
  const dataObjeto = new Date(dataYMD);

  // 2. Converter o objeto Date para a string ISO 8601
  // O método .toISOString() retorna a data no formato ISO 8601 em UTC
  const dataISO = dataObjeto.toISOString();

  await prisma.gastos.update({
    where: {
      id: userId,
    },
    data: {
      data: dataISO,
      produto: req.body.produto,
      qtd: req.body.qtd,
      valor_unitario: req.body.valor_unitario,
    },
  });
  res.status(200).send('Item editado com sucesso!');
});


app.listen(process.env.PORT);

console.log("Servidor escutando... http://localhost:8080/");
