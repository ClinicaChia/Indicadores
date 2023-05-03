import { pool } from "../../config/pana_dinamica";


export default async (req,res)=>{

    let id=req.body.id;

    [id]= await pool.query(`select id from usuarios where usuario='${id}'`)

    console.log(id);
    return res.status(200).json(id);
    
}
