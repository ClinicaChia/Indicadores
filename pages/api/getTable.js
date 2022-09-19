/* eslint-disable import/no-anonymous-default-export */
import { pool } from "../../config/pana_dinamica";
import { GenSQL } from "../../config/logicaSQL";

export default async (req,res)=>{

        
    let fillyears=req.body.nombres[0];
    let fillmeses=req.body.nombres[1];
    let fillsedes=req.body.nombres[2];
    let fil=[]

    let fill=(GenSQL.SQLtextOR('years','year',fillyears));

    fil.push(fill);

    fill=(GenSQL.SQLtextOR('meses','mes',fillmeses));

    fil.push(fill);

    fill=(GenSQL.SQLtextOR('sedes','sede',fillsedes));

    fil.push(fill);

    
   

    fil=GenSQL.SQLtextAND(fil);

    

    let [tabla]= await pool.query(`SELECT valores.id,especialidades.nombre,valores.valor,years.year,meses.mes,sedes.sede,indicadores.nombre_indicador
    FROM ((((( valores inner join meses on meses.id=valores.idmes) 
      inner join years on valores.idyear=years.id)
      inner join sedes on valores.idsede=sedes.id)
      inner join indicadores on valores.idindicador=indicadores.id)
      inner join especialidades on valores.idespecialidad=especialidades.id) WHERE (${fil})`);


     
      
    return res.status(200).json( {tabla});


}

