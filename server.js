import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

var app = express();
app.use(express.json());
app.use(cors());

app.get("/consulta", async (req, res) => {
  var listaMovimentacoes = await prisma.movimentacoes.findMany();
  res.json(listaMovimentacoes);
});

app.post("/cadastrar", async (req, res) => {
  res.send("Olá Mundo!");
  console.log(req.body);
  await prisma.movimentacoes.create({
    data: {
      data: req.body.data,
      situacao: req.body.situacao,
      produto: req.body.produto,
      peso: req.body.peso,
      valor: req.body.valor,
    },
  });
});

app.put("/atualizar/:id", async (req, res) => {
  const userId = req.params.id;

  await prisma.movimentacoes.update({
    where: {
      id: userId,
    },
    data: {
      data: req.body.data,
      situacao: req.body.situacao,
      produto: req.body.produto,
      peso: req.body.peso,
      valor: req.body.valor,
    },
  });
});

app.delete("/deletar/:id", async (req, res) => {
  const userId = req.params.id;
  await prisma.movimentacoes.delete({
    where: {
      id: userId,
    },
  });
});

app.listen(process.env.PORT);

console.log("Servidor escutando... http://localhost:8080/");
