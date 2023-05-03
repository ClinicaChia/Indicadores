import { createPool } from "mysql2/promise";


const pool =createPool({
    host:'localhost',
    user:'root',
    password:'Clinica2030*',
    port:'3306',
    database: 'indicadores_ok'
})

export {pool};

