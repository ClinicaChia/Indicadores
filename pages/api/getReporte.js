/* eslint-disable import/no-anonymous-default-export */

import { pool } from "../../config/pana_dinamica";
import { GenSQL } from "../../config/logicaSQL";

export default async (req,res)=>{


    const respuesta={}
    let [consulta]=await pool.query(`SELECT cambios.usuario,cambios.valor_sistemas,
    especialidades.nombre,valores.valor,
    years.year,meses.mes,sedes.sede,indicadores.nombre_indicador
        FROM (((((( valores inner join meses on meses.id=valores.idmes) 
          inner join years on valores.idyear=years.id)
          inner join sedes on valores.idsede=sedes.id)
          inner join indicadores on valores.idindicador=indicadores.id)
          inner join especialidades on valores.idespecialidad=especialidades.id)
          inner join cambios on valores.id=cambios.idvalor)`);

    respuesta.tabla=consulta;

    [consulta]=await pool.query(`SELECT year from years`);

    respuesta.years=consulta;

    [consulta]=await pool.query(`SELECT mes from meses`);

    respuesta.meses=consulta
    return res.status(200).json( respuesta );

}

