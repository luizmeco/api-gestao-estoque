import "dotenv/config";
import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

var app = express();
app.use(express.json())

app.get("/consulta",async (req, res) => {
    var listaMovimentacoes = await prisma.movimentacoes.findMany()
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
            valor: req.body.valor
        }
    })
})
app.listen(process.env.PORT);

console.log("Servidor escutando... http://localhost:8080/");
