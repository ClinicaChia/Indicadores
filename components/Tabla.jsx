import Head from 'next/head'
import { useForm } from "react-hook-form";
import  axios  from 'axios';
import Router from 'next/router'
import React, { useState,useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export default function TablaDinamica(props){

  
  const meses=props.meses;
  const years=props.years;
  const indicadores=props.indicadores;
  const especialidades=props.especialidades;
  const data=props.data.tabla;
  const sede=props.sede;
  const fechaA=new Date();
  const mesA=fechaA.getMonth();
  const yearA=fechaA.getFullYear();
  const dayA=fechaA.getDay();
  const tablaC=props.tablaC;
  const setTablaC=props.setTablaC;
  const edit=props.isChange;

  console.log(mesA,yearA)


const fillData= (dat,type,keyword)=>{

  const temp=[]


  dat.map( (row,index)=>{

      if(row[type]==keyword){temp.push(row)}
      

  } )

 return temp;
}



const  dataS=fillData(data,'sede',sede);

const AddRow=(e)=>{
  let mesesR=['Enero','Febrero','Marzo','Abril','Mayo',
  'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  let dataC=e.target.id;
  dataC=dataC.split('-');
  let id;

  let mes= mesA==0?11:mesA-1;
  let ano= mesA==0?yearA-1:yearA;
  data.map( (fila)=>{
      //agregar el if del mes al mes 
    if(fila.sede==dataC[0] && fila.year==`${ano}` && 
      fila.nombre==dataC[1] && fila.nombre_indicador==dataC[2] 
      && fila.mes==mesesR[mes].toLowerCase() ){
      id=fila;
    }

  } )
  console.log("aqui esta")
  console.log(id);
  if(e.target.checked && id!=undefined){
    setTablaC([...tablaC,id])
  }
  
  else{
    setTablaC(tablaC.filter( dat=> dat.id!=id.id )  );
  }

  if( e.target.checked && id==undefined){
    alert("No se ecuentra un dato");
  }


  
  
  

}
  return( 
    <>
    <div className={props.oculto==true ? "hidden":""}>
    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
      <table id="table-to-xls">
        <thead>
          <tr>
            <th>Año</th>
            <th>Especialidad</th>
            <th>Indicador</th>
            {meses.map( (mes,index)=>{
              return( <th key={index}>{mes}</th> )
            } )}
            <th>Rechazar indicador</th>
          </tr>
        </thead>

        <tbody>


                {years.map( (y,i1)=>{
                  
                  
                  let dataY=fillData(dataS,'year',y);
                  
                  
                  return( 

                    

                    <><tr key={i1}>

                      <td rowSpan={(especialidades.length)*(indicadores.length)+especialidades.length+1}> {y} </td>


                    </tr>
                    
                    { especialidades.map( (e,i2)=>{
                      let dataE=fillData(dataY,'nombre',e);
                      
                      
                      return(

                        <>

                        <tr>
                          <td rowSpan={indicadores.length+1}> {e} </td>
                        </tr>

                        {indicadores.map( (i,i3)=>{

                          let dataI=fillData(dataE,'nombre_indicador',i);
                         
                        
                          return(

                            // eslint-disable-next-line react/jsx-key
                              <tr>
                                <td> {i} </td>
                                {meses.map( (m,i4)=>{
                                  let dataM=fillData(dataI,'mes',m);

                                  // eslint-disable-next-line react/jsx-key
                                  if(dataM[0]==undefined){
                                    return <td key={m+i4}>-</td>
                                  }
                                  return( <td key={dataM[0].id}> {dataM[0].valor} </td> )

                                } ) }
                                <td>  <input type="checkbox"   disabled={ (edit && dayA<=15)  ==true?false:true } onChange={AddRow} name="new_dat" id={`${sede}-${e}-${i}`} />  </td>
                              </tr>
                              
                        
                          )

                        } )}



                        </>

                      )

                    } ) }

                   
                      
                      
                      </>
                  )



                  } )}
            
        </tbody>
      </table>
    </div>
    
    
    </>
   )

    

}