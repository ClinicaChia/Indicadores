/* eslint-disable import/no-anonymous-default-export */
import { pool } from "../../config/pana_dinamica";
import { GenSQL } from "../../config/logicaSQL";

export default async (req,res)=>{

    const data= await JSON.parse(req.body);


    

    const [meses]=await pool.query('SELECT mes FROM meses');

    const [years]= await pool.query('SELECT year FROM years');

    const [indicadores]=await pool.query('SELECT nombre_indicador FROM indicadores');

    const [sedes]= await pool.query(` SELECT sedes.sede,sedes.id
    FROM ((permisos INNER JOIN  usuarios ON permisos.idusuario=usuarios.id) 
    inner join sedes ON sedes.id=permisos.idsede) WHERE usuarios.usuario='${data.user}' ` );

    let sedesToFill=sedes.map( (el)=>{ 
         
        return el.sede;
     } )

     
 

    const fill=(GenSQL.SQLtextOR('sedes','sede',sedesToFill));
    
    //Se necesita una nueva estrucutracion, por lo que se realiza un for por cada sede disponible

    let especialidades={};
     let temp;
    for(let i=0;i<sedesToFill.length;i++){
        [temp]=(await pool.query(`SELECT especialidades.nombre,sedes.sede
    FROM ((((( valores inner join meses on meses.id=valores.idmes) 
      inner join years on valores.idyear=years.id)
      inner join sedes on valores.idsede=sedes.id)
      inner join indicadores on valores.idindicador=indicadores.id)
      inner join especialidades on valores.idespecialidad=especialidades.id) WHERE (sedes.sede='${sedesToFill[i]}')`));

      temp=await temp.map(  (el)=>{
        return(el.nombre);
            } )

       temp= new Set(temp);

       temp= Array.from(temp);
       

       especialidades[sedesToFill[i]]=temp;
       

    }

    
    return res.status(200).json( {years,meses,indicadores,sedes,especialidades});


}

