const express = require('express')
const respuestas = require('../../Respuestas/respuestas')
const controlador = require('./index');

const router = express.Router();

router.post('/login', login);

async function login(req, res, next){
   try {
      console.log('Cuerpo de la solicitud POST:', req.body); 
      const items = await controlador.login(req.body.user_name, req.body.user_password)
      respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }  
}

module.exports = router;