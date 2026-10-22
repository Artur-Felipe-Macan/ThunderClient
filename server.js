const express = require('express');
const fs = require('fs');

// Cria uma aplicação com o express
const app = express();
const PORTA = 3000;

// Definir a forma de comunicação entre o NODE e o JS
app.use(express.json());

// Pegar nosso arquivo das comandas
const ARQUIVO = 'pedidos.json';

// Criar a rota de leitura das comandas
app.get('/pedidos',(req,res)=>{
    // Pegar o conteúdo e colocar em uma variável
    const conteudoTexto = fs.readFileSync(ARQUIVO,'utf-8');
    // Transformar o texto em um array JS
    const pedidos = JSON.parse(conteudoTexto);
    // Devolver a resposta com o conteúdo do arquivo
    res.json(pedidos);
});

// Criar a nossa rota de cadastro
app.post('/pedidos',(req,res)=>{
    // Capturar as informações do body da nossa comanda
    const novoPedido = req.body;
    // Criar o id do novo pedido
    novoPedido.id=Date.now().toString();
    // Ler novamente o arquivo dos pedidos para poder editar
    const conteudoTexto=fs.readFileSync(ARQUIVO,'utf-8');
    const pedidos=JSON.parse(conteudoTexto);
    // Adicionamos o novo pedido no nosso array do json
    pedidos.push(novoPedido);
    // Escrevemos as informações novas no arquivo pedidos.json
    fs.writeFileSync(ARQUIVO, JSON.stringify(pedidos,null,2));
    // Devolvemos uma resposta ao nosso usuário
    res.status(201).json({mensagem:"Pedido cadastrado",pedido:novoPedido});
});

// Definimos por onde nosso servidor vai ficar ouvindo/esperando requisições
app.listen(PORTA,()=>{
    console.log("Servidor Rodando!")
});