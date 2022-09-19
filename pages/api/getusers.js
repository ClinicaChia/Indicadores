/* eslint-disable import/no-anonymous-default-export */
import { pool } from "../../config/pana_dinamica";


export default async (req,res)=>{

    

    const [tabla1]=await pool.query('select * from usuarios');

    const [tabla]= await pool.query(`SELECT usuarios.id,usuarios.usuario,usuarios.contrasena,sedes.sede,usuarios.edit
    FROM ((permisos INNER JOIN  usuarios ON permisos.idusuario=usuarios.id) 
    inner join sedes ON sedes.id=permisos.idsede) `);

    
    

    

    

    return res.status(200).json( {tabla1,tabla});


}

