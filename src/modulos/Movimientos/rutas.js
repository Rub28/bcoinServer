const express = require('express')
const respuestas = require('../../Respuestas/respuestas')
const controlador = require('./index');

const router = express.Router();

//router.get('/', todos);
router.post('/todosMovimientos', todosMovimientos);
router.get('/:id', uno);
router.post('/hit', hitMaximo); 
router.post('/', agregar);
router.put('/', baja);


async function todos(req,res, next){
   try {
      const items = await controlador.todos()
      respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }  
}

async function uno (req,res, next){
   try {
      console.log(" Uno --> ")
      const items = await controlador.uno(req.params.id)
         respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }
}

async function hitMaximo (req,res, next){
   try { 
      console.log("Query --> ", req.body)
      const items = await controlador.hitMaximo(req.body)
         respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }
}

async function agregar (req,res, next){
   try {
      const items = await controlador.agregar(req.body)
      if(req.body.id == 0){
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

async function todosMovimientos(req,res, next){
   try {
      console.log("todosMvimientos req.body.id_agente", req.body.id_agente)
      const items = await controlador.Movimientos(req.body)
      respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }  
}


module.exports = router;