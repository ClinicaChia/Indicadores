/* eslint-disable import/no-anonymous-default-export */

import { pool } from "../../config/pana_dinamica";


export default async (req,res)=>{

   
    
    const nombre=req.body.nombre;
    const password=req.body.pass;
    const permisos= req.body.permisos;
    const edit=req.body.edit;

    

    
    const [exists]= await pool.query(`SELECT id FROM usuarios WHERE usuario= '${nombre}'`);

    if (exists.length==0){

        await pool.query(`INSERT INTO usuarios (usuario,contrasena,edit) values (?,?,?)`,[nombre,password,edit]);

    let [id_user]=await pool.query(`SELECT id FROM usuarios WHERE usuario= '${nombre}'`);
    id_user=id_user[0].id;
    
    

    for(let id=0;id<permisos.length;id++){
        if(permisos[id]){
            
            await pool.query(`INSERT INTO permisos (idusuario,idsede) values (?,?)`,[id_user,id+1]);
        }
        
    }

    const [id]= await pool.query(` SELECT id FROM usuarios where usuario='${nombre}'`);

    return res.status(200).json(id);

    }

    return res.status(200).json(-1);
    
}
