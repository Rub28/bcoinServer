const express = require('express')
const seguridad = require('./seguridad.js')
const respuestas = require('../../Respuestas/respuestas')
const controlador = require('./index');

const router = express.Router();

router.post('/validaUsuario',seguridad(),validaUsuario);
router.get('/', seguridad(),todos);
router.get('/:id', uno);
//router.post('/', agregar);
router.post('/', seguridad(), agregar);
router.put('/',seguridad(), baja);

async function todos(req,res, next){
   try {
      const items = await controlador.todos(req.query)
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
   console.log("req.body", req.body)
   try {
      const items = await controlador.baja(req.body)
         respuestas.success(req, res, 'Registro dado baja correctamente', 200)
   } catch (error) {
         next(error)
   }
}

async function validaUsuario (req,res, next){
   try {
      const items = await controlador.validaUsuario(req.body)
         respuestas.success(req, res, items, 200)
   } catch (error) {
      next(error)
   }
}

module.exports = router;