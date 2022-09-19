import { pool } from "../../config/pana_dinamica";

export default async function handler(req, res) {


    
  
    

    //----se tienen que eliminar todos los que son de permisos, luego se eliminan de la tabla

    await pool.query(`DELETE FROM permisos where idusuario='${req.body.id}'`);

    await pool.query(`DELETE FROM usuarios where id='${req.body.id}'`);

    res.status(200).json("Se elmino el usuario correctamente");
  }
  