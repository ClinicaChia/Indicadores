/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from 'next/router';
import React, { useState,useEffect } from 'react';
import  axios  from 'axios';
import TablaDinamica from '../../components/Tabla';
import Selector from '../../components/Selector';
import TDinamica from '../../components/TDinamica';
import styles from  '../../styles/reporte.module.css'


export default (props)=>{

    const [tabla,setTabla]=useState([]);
    const [mes,setMes]=useState('');
    const [year,setYear]=useState('');
    const data=props.data.tabla;
    const meses=props.data.meses;
    const years= props.data.years;

    useEffect( ()=>{
        setTabla(data);
        setMes('todos');
        setYear('todos');
        
    },[])

    useEffect( ()=>{
     let fill=data;
     if(year!='todos'){  fill=fill.filter( vals => vals.year==year ) }
     if(mes!='todos'){ fill=fill.filter( vals => vals.mes==mes )}
     setTabla(fill);
     
    },[year,mes])

    const handleOnChange= (e)=>{

        if(e.target.name=='years'){
            
            if(e.target.value=='todos'){

                setYear("todos");

            }
            else{
                setYear(e.target.value);
            }
            
        }
        else{
            if(e.target.value=='todos'){

                setMes("todos");

            }
            else{
                setMes(e.target.value);
            }
        }

    }

    return(
        <div className={styles.main}>  

            <h1>Sistema de Reporte Para auditoria</h1>

            <div>
                <section>
                    <select className={styles.select} onChange={handleOnChange} name="years" id="1">
                            <option value="todos"></option>
                            {years.map( (val,index)=>{
                                return(<option key={index}  value={val.year}> {val.year} </option>)
                                
                            } )}
                    </select>
                 <select className={styles.select} onChange={handleOnChange} name="meses" id="2">
                <option value="todos"></option>
                    {meses.map( (val,index)=>{
                        return(<option key={index}   value={val.mes}> {val.mes} </option>)
                        
                    } )}
                </select>
                    <button className={styles.send} onClick={()=>{print() }}> Imprimir reporte  </button>

                </section>
                

                
            </div>
            
            <div>
                
                 <table>
                     <thead>
                         <tr>
                             <th>Año</th>
                             <th>Mes</th>
                             <th>Sede</th>
                             <th>Especialdiad</th>
                             <th>Indicador</th>
                             <th>valor modificado</th>
                             <th>valor sistemas</th>
                             <th>usuario</th>
                         </tr>
                     </thead>
                     <tbody>
                         {tabla.map( (row,index)=>{
                             return(
                                 <tr key={index}>
                                     <td>{row.year}</td>
                                     <td>{row.mes}</td>
                                     <td>{row.sede}</td>
                                     <td>{row.nombre}</td>
                                     <td>{row.nombre_indicador}</td>
                                     <td>{row.valor}</td>
                                     <td>{row.valor_sistemas}</td>
                                     <td>{row.usuario}</td>
                                 </tr>
                             )
                         } )}
                     </tbody>
                 </table>
            </div>

        </div>
    )

}


export async function getServerSideProps(context) {

    let data=await fetch( process.env.HOST_URI + '/api/getReporte');
  
    data=await data.json();
    return {
      props: { data }, // will be passed to the page component as props
    }
  }