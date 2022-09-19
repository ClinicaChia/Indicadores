/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { useRouter } from 'next/router';
import React, { useState,useEffect } from 'react';
import  axios  from 'axios';
import TablaDinamica from '../../components/Tabla';
import Selector from '../../components/Selector';
import TDinamica from '../../components/TDinamica';
import styles from  '../../styles/id.module.css'
import Router from 'next/router'

export default (props)=>{

  const name=props.name;
  props=props.data;
  const meses= props.meses.map( val => {return(val.mes)} );
  const years= props.years.map( val => {return(val.year)} );
  const sedes=props.sedes.map( val => {return(val.sede)} );
  const indicadores=props.indicadores.map( val => {return(val.nombre_indicador)} );;

  
  const especialidades=props.especialidades;

 
 

  //const especialidades=props.especialiadades; faltan las
  


  //Se realiza los setstates para las busquedas en las bases de datos

  const [Years,setYears]= useState([]);
  const [Meses,setMeses]= useState([]);
  const [Sedes,setSedes]= useState([]);
  const [tabla,setTabla]= useState({});
  const [BotonesConsulta,setBotonesConsulta]= useState(['t','t','t']);
  
  
 // setstates para las tablas

 const [YearsT,setYearT]= useState([]);
 const [MesesT,setMesesT]= useState([]);
 const [SedesT,setSedesT]= useState([]);

 //set staticos la T quiere decir de tabla



 //array de verdades

 
 //set dinamicos
//La funcion para realizar que quede solo 1   




const getTableData= async ()=>{

  
  const res=await axios.post('/api/getTable',{ nombres:[Years,Meses,Sedes] });

  let tab=await res.data;
  
  
  setTabla(tab);
  setYearT(Years);
  setMesesT(Meses);
  setSedesT(Sedes);

}



 const handleOnChange= (e)=>{
    const id= parseInt(e.target.id);
    if(e.target.type=='button'){
      let temp;
      if(id<=3){ //Botones para consulta 
       
        temp=BotonesConsulta.map( (val,index)=>{
          if(index==id-1){
            return ( val=='t'?'f':'t')
          }
          return val;
        } )
        
        setBotonesConsulta(temp);
      }

    }

    }
    

  return (  
    
    <div className={styles.container}>

        <div className={styles.header}>
          <h2>Base de datos Indicadores</h2>
    </div>
        
        
        <div className={styles.botonera}>

          
          <h3>Botones para consulta</h3>
          <div><button className={styles.send} type='button' id='1'  onClick={handleOnChange}>  Años  </button></div>
          <div><button className={styles.send} type='button' id='2'  onClick={handleOnChange}>  Meses  </button></div>
          <div><button className={styles.send} type='button' id='3'  onClick={handleOnChange}>  sedes  </button></div>
          <div><button className={styles.send} type='button' id='4' onClick={getTableData}> Consultar</button></div>
          <div className= {name=="super"? '':'hidden'}>
          <button className={styles.send}  type='button' id='5' onClick={ ()=>{( Router.push(`reporte`) )}}>Auditoria de Informacion</button>
          </div>
         
          

        </div>

        <div className={styles.cheks}>

          <h3>  Campos Para la consulta </h3>

        <Selector titulo="Años" sellectAll='t' setData={setYears} ocultar={BotonesConsulta[0]} data={years}/>
          <Selector titulo="Meses" sellectAll='t' setData={setMeses} ocultar={BotonesConsulta[1]} data={meses}/>
          <Selector titulo="Sedes" sellectAll='t' setData={setSedes} ocultar={BotonesConsulta[2]} data={sedes}/>

        </div>


          
          <div className={styles.td}>
            <TDinamica user={name} data={tabla} years={YearsT} especialidades={especialidades} meses={MesesT} sedes={SedesT} indicadores={indicadores}/>
          </div>
          

    </div>
   )
}

 
export async function getServerSideProps(context) {

  const name=context.params.id;

  let data=await fetch('http://173.16.10.151:3001/api/getdata',{ method: 'POST', body: JSON.stringify({ user: name })   });
  
   data=await data.json();
   
   
   
  return {

    props: {data,name}// will be passed to the page component as props
  }
}