const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async ( req, res = response )=>{

    const {email, password} = req.body;

    try {
        
        const existeEmail = await Usuario.findOne({email:email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario( req.body );
        
        // Encriptar password

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        //Generar mi JWT
        const token = await generarJWT(usuario.id);

        
        res.json({
            ok:true, 
            usuario,
            token 
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
        
            ok:false,
            msg:'Hable con el administrador'

        });
    }

    
    
   

}


const login = async (req, res = response)=>{

    const {email, password} = req.body;

try {

    //validar email

    const usuarioDB = await Usuario.findOne({email});
    
    if(!usuarioDB){
        
        return res.status(404).json({
            ok:false, 
            msg:'El email ingresado no es correcto'
        });

    }

    //validar password
    const validPassword = bcrypt.compareSync( password, usuarioDB.password );

    if(!validPassword){
        
        return res.status(400).json({
            ok:false, 
            msg:'La contraseña es incorrecta'
        });
    
    }

    const token = await generarJWT(usuarioDB.id);

    res.json({
        ok:true, 
        usuario: usuarioDB,
        token 
    });

    
} catch (error) {
    console.log(error);
    res.status(500).json({
        
        ok:false,
        msg:'Hable con el administrador'

    });
}

}



const renweToken = async(req, res = response)=>{
    
    const uid  = req.uid;

    //generar un nuevo jwt, generarJWT (UID)
    const token = await generarJWT(uid);

    //obtener el usuario por el uid, Usuario.findById...
    const usuario = await Usuario.findById(uid);


    



    res.json({
        ok: true,
        usuario: usuario,
        token
    });

}

module.exports = { crearUsuario, login, renweToken };