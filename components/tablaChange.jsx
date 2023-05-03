/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { useForm } from "react-hook-form";
import  axios  from 'axios';
import Router from 'next/router'
import React, { useState,useEffect } from 'react';
import styles from  '../styles/id.module.css'


export default function ChangeTable(props){

    const data=props.data;
    console.log(data);
    const [valores,setValores]=useState([]);
    const user=props.user;
    

    



    useEffect( ()=>{
        console.log("cambio")
        const temp=[]
        data.forEach( () => {

            temp.push('');
            
        });

        setValores(temp);

    },[data])


    
    const handleOnChange= (e)=>{

        const id=parseInt(e.target.id);
        

      
        
        
        
        setValores( valores.map( (val,index)=>{
            console.log(val);
            if(index==id){return e.target.value}
            return val
        } ) );

    }

    const sendData= async ()=>{

        //la data y los valores

        //idvalor
        //idusuario
        //valordesistemas
        const res=await axios.post('/api/modify',{ 
            Old:data,
            New:valores,
            user
         })

         if(res.data=='OK'){
             alert("Datos modificados correctamente")
         }

    }

    return(

        <>
          <table>

            <thead>
                <th>Sede</th>
                <th>Año</th>
                <th>Mes</th>
                <th>Especialdiad</th>
                <th>Indicador</th>
                <th>Valor actual</th>
                <th>Nuevo valor</th>
            </thead>

            <tbody key={data.length}>

                {data.map( (val,index)=>{
                    try{
                        return(
                            <tr key={val.id}>
                                <td> {val.sede} </td>
                                <td>{val.year}</td>
                                <td>{val.mes}</td>
                                <td>{val.nombre}</td>
                                <td>{val.nombre_indicador}</td>
                                <td>{val.valor}</td>
                                <td> <input type="number"  onChange={handleOnChange}  id={index}/> </td>
                            </tr>)
                    }
                    catch{alert("No hay dato que coincida con el")}
                    
                } )}

            </tbody>

          </table>

          <button className={styles.sendT} onClick={sendData}>Guardar Cambios</button>
        </>
    )
}