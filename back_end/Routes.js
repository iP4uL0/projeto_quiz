import express, { Router } from 'express'
import sql from './bd.js'
import { compararHash, Criarhash } from './utils.js';


const routes = express.Router()

//busca de usuarios 
routes.post('/login',async (req, res)=>{
    const { usuario, senha } = req.body
    try{
        
        const consulta = await sql`select id, senha, status from usuarios
        where usuario = ${usuario}`

        if(consulta.length == 0){
            return res.status(401).json('usuario ou senha incorretos')
        }

        const teste = await compararHash(senha, consulta[0].senha)

        if(teste){
            return res.status(200).json('logado')
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
        
        await sql`insert into usuarios(usuario, senha, status)
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
        
        await sql`insert into usuarios(usuario, senha, status)
        values(${usuarioA},${hash},'adimim')`

        return res.status(201).json('ok')

    } catch(error){
        console.log(error)
        return res.status(500).json('algo deu errado')

    }

})



export default routes