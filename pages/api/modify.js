import { pool } from "../../config/pana_dinamica";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res)=>{

    const Old=req.body.Old;
    const New=req.body.New;
    const user=req.body.user;

    

    Old.forEach ( async (el,index) => {

        await pool.query(`UPDATE valores SET valores.valor = '${parseInt(New[index])}' WHERE ( id = '${el.id}')`);
        await pool.query(`INSERT INTO cambios (idvalor,usuario,valor_sistemas) values (?,?,?)`,
        [el.id,user,el.valor]); 
        
        
    });
    
    //
    return res.status(200).json('OK');
}