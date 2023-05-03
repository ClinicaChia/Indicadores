import { pool } from "../../config/pana_dinamica";

export default async (req,res)=>{

    

    let [tabla]= await pool.query(`SELECT * FROM sedes`);
    

    

    return res.status(200).json(tabla);
}