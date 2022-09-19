import { pool } from "../../config/pana_dinamica";

export default async (req,res)=>{

    const nombre=req.body.nombre;
    const password=req.body.pass;
    

    let [tabla]= await pool.query(`SELECT * FROM usuarios WHERE usuario='${nombre}'`);
    

    
    if(tabla.length==0){
        return res.status(200).json("Usuario no existe");
    }
    else{ 
        tabla=tabla[0];
        if(tabla.contrasena!=password) {return res.status(200).json("Contraseña incorrecta")};
    }
    
    

    

    return res.status(200).json('OK');
}