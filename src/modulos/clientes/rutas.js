const express = require('express')
const respuestas = require('../../Respuestas/respuestas')
const controlador = require('./index');

const router = express.Router();
router.get('/autocomplete', ClientesAutocomplete);
router.post('/todosagente', todosAgente);
router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', baja);



async function todos(req,res, next){
   try {
      console.log("entra aca")
      const items = await controlador.todos()
      respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }  
}

async function uno (req,res, next){
   try {
      const items = await controlador.uno(req.params.id)
         respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }
}

async function agregar (req,res, next){
   try {
      const items = await controlador.agregar(req.body)
      if(req.body.id_cliente == 0){
         mensaje = 'Registro agregado correctamente';
      } else{
         mensaje = 'Registro actualizado correctamente';
      }
         respuestas.success(req, res, mensaje, 201)
   } catch (error) {
         next(error)
   }
}

async function baja (req,res, next){
   try {
      const items = await controlador.baja(req.body)
         respuestas.success(req, res, 'Registro dado baja correctamente', 200)
   } catch (error) {
         next(error)
   }
}

async function ClientesAutocomplete(req,res, next){
   try {
      console.log("req.params.query", req.query.query)
      console.log("req.params.id_agente", req.query.id_agente)
      console.log("req.params.roluser", req.query.roluser)
      const items = await controlador.ClientesAutocomplete(req.query)
      respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }  
}

async function todosAgente (req,res, next){
   console.log("req.body", req.body)
   try {
      const items = await controlador.todosAgente(req.body)
         respuestas.success(req, res, items, 200)
   } catch (error) {
         next(error)
   }
}

module.exports = router;