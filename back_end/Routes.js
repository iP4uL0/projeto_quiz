import express, { Router } from 'express'
import sql from './bd.js'
import { compararHash, Criarhash } from './utils.js';


const routes = express.Router()

//busca de usuarios 
routes.post('/login',async (req, res)=>{
    const { usuario, senha } = req.body
    try{
        
        const consulta = await sql`select id, senha, status from usuarios_projeto
        where usuario = ${usuario}`

        if(consulta.length == 0){
            return res.status(401).json('usuario ou senha incorretos')
        }

        const teste = await compararHash(senha, consulta[0].senha)

        if(teste){
            console.log(consulta)
            return res.status(200).json(consulta[0])
        }
        else{
            return res.status().json('usuario ou senha incorretos')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json('um erro inesperado ocorreu')
    }
})

//cadastro de alunos
routes.post('/usuario', async (req, res)=>{
    
    try {
        const {usuario, senha} = req.body;

        const hash = await Criarhash(senha, 10)
        
        await sql`insert into usuarios_projeto(usuario, senha, status)
        values(${usuario},${hash},'aluno')`

        return res.status(201).json('ok')

    } catch(error){
        console.log(error)
        return res.status(500).json('algo deu errado')

    }
})

//cadastro de Adiministradores
routes.post('/Admin', async (req, res)=>{
    
    
    try {
        const {usuarioA, senha} = req.body;

        const hash = await Criarhash(senha, 10)
        
        await sql`insert into usuarios_projeto(usuario, senha, status)
        values(${usuarioA},${hash},'adimim')`

        return res.status(201).json('ok')

    } catch(error){
        console.log(error)
        return res.status(500).json('algo deu errado')

    }

})

//cadastro perguntas
routes.post('/Cperguntas', async (req, res)=>{
    try{
        const {pergunta, a, b, c, d, dificuldade, correct_answer } = req.body;
    await sql`insert into perguntas (pergunta, a, b, c, d, dificuldade, correct_answer) values (${pergunta}, ${a}, ${b}, ${c}, ${d},  ${dificuldade}, ${correct_answer});`
    return res.status(200).json('ok')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('erro ao cadastrar pergunta')
    }
})


//Busca perguntas
routes.get('/Bperguntas',async (req, res)=>{

    try{
            const consulta = await sql`SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1`
            return res.status(200).json(consulta)
    }
    catch(error){
        console.log(error)
        return res.status(500).json('Ocorreu um erro inesperado')
    }
    
});


routes.get('/Aperguntas',async (req, res)=>{


    try{
            const consulta = await sql`SELECT * FROM perguntas`
            return res.status(200).json(consulta)
    }
    catch(error){
        console.log(error)
        return res.status(500).json('Ocorreu um erro inesperado')
    }
    
});


//Deletar pergunta
routes.delete('/Delete/:id', async (req, res)=>{

    try{
        const {id } = req.params
        await sql`DELETE FROM perguntas WHERE id = ${id};`
        return res.status(200).json('Pergunta deletada')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('ocorreu um erro')
    }
})


//Editar perguntas
routes.put('/editar', async (req, res)=>{
   
    
    try{
        const {id, pergunta, a, b, c, d, dificuldade, correct_answer} = req.body
        await sql`update perguntas set 
        pergunta = ${pergunta}, 
        a = ${a}, 
        b = ${b}, 
        c = ${c}, 
        d = ${d}, 
        dificuldade = ${dificuldade}, 
        correct_answer = ${correct_answer}
        where id = ${id};`
  

        return res.status(200).json('Ação efetuada')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('Erro inesperado')
        
    }
})


export default routes