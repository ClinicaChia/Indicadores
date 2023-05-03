/* eslint-disable import/no-anonymous-default-export */

import { pool } from "../../config/pana_dinamica";


export default async (req,res)=>{

    console.log(req.body.user)

    const [id]= await pool.query(` SELECT edit FROM usuarios where usuario='${req.body.user}'`);

    return res.status(200).json(id);


    
}