import { createPool } from "mysql2/promise";


const pool =createPool({
    host: process.env.DB_URI ,
    user:'root',
    password:'clinica2020',
    port:'3310',
    database: 'indicadores_ok'
})

export {pool};

