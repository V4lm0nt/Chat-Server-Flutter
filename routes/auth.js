/*

    path: /api/login

  */

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renweToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

  router.post('/new', [
    //nombre
    check(  'nombre',   'El nombre es obligatorio').not().isEmpty(),
    //email checks
    check(  'email',    'Introduzca un Email válido').isEmail(),
    //password checks
    check(  'password', 'La contraseña es obligatoria').not().isEmpty(),

    validarCampos
  ], crearUsuario);


  router.post('/',[
    check(  'email',    'Introduzca un Email válido').isEmail(),
    check(  'password', 'La contraseña es obligatoria').not().isEmpty(),
  ], login);

  //validarJWT
  router.get('/renew', validarJWT, renweToken);



    

      
    

module.exports=router;