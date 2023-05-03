/* eslint-disable import/no-anonymous-default-export */
import { pool } from "../../config/pana_dinamica";
import { GenSQL } from "../../config/logicaSQL";

export default async (req,res)=>{

    const data= req.body.sede;


    let [especialiadades]= await pool.query(`SELECT especialidades.nombre,sedes.sede
    FROM ((((( valores inner join meses on meses.id=valores.idmes) 
      inner join years on valores.idyear=years.id)
      inner join sedes on valores.idsede=sedes.id)
      inner join indicadores on valores.idindicador=indicadores.id)
      inner join especialidades on valores.idespecialidad=especialidades.id) WHERE sedes.sede='${data}'`);

    especialiadades=especialiadades.map(  (el)=>{
        return(el.nombre);
    } )
    
    especialiadades= new Set(especialiadades);

    especialiadades= Array.from(especialiadades);
    

    
    

    return res.status(200).json({especialiadades});


}

