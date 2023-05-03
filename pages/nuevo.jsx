/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import Head from 'next/head'
import Image from 'next/image'
import logo from '../public/logo.jpg'
import { useForm } from "react-hook-form";
import  axios  from 'axios';
import Router from 'next/router'
import React, { useState,useEffect } from 'react';
import styles from  '../styles/nuevo.module.css'


export default (props)=>{

  

    const { register, handleSubmit,watch } = useForm();
    const sedes=props.sedes;
    const initStateP=[]
    sedes.forEach( ()=>{
      initStateP.push(false);
    } );
    const [permisos,Setpermisos] = useState(initStateP);
    const [tablaU,SetablaU] = useState(props.tablaU.tabla1);
    const [tabla_permisos,setPermisos]=useState(props.tablaU.tabla);

    console.log(watch("EditProp"))


    const eventManage= (e)=>{
      
      if(e.target.type=="checkbox"){
        permisos[e.target.id-1]=e.target.checked;
        Setpermisos(permisos);
      }

      else if(e.target.type=="button"){ //aqui se borran

         const id= e.target.id;

         console.log(id);

         axios.post('/api/delete',{id}).then( (res)=>{alert(res.data)} )
        
         SetablaU( tablaU.filter( fila => fila.id!=id) );
        
      }

    }
    
    const onSubmit = async data => {


      let res= await axios.post('/api/create',{ 
        nombre: data.User ,
        pass: data.Password,
        edit:`${data.EditProp}`,
        permisos
      })

      

    //  try{
        let actualU= await axios.get('/api/getusers');
        
         actualU=actualU.data;

         console.log(actualU);

         SetablaU(actualU.tabla1);
         setPermisos(actualU.tabla);
        
     // }

     // catch{
       // alert("Usuario ya existe");
     // }

    }

    return( 
    
      <>
      <div className={styles.container}>

      <div className={styles.header}>
         <h1 > Creacion de nuevo usuario </h1>
      </div>

      <div className={styles.sed}>
        <h2>
          sedes
        </h2>
        <div className={styles.lista}>
        { sedes.map( (fila)=>{
            
            return(  
              <div key={fila.id}> 
                <p >
                  <input type="checkbox"  id={fila.id} onChange={eventManage}/>
                  <label htmlFor={fila.id}> {fila.sede}</label>

                </p> 
              </div>
                
             )


          } ) }
        </div>
          
        
      </div>


      <div  className={styles.register}>
      <h2>Registro de usuario</h2>
        <div>
          
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>
                <button className={styles.box_input} 
                disabled htmlFor="nombre">Usuario:</button>
              <input className={styles.place} placeholder='nombre del usuario...' type="text" {...register("User")} />
              </p>

              <p><button className={styles.box_input} 
                disabled htmlFor="nombre">Contraseña:</button>
              <input className={styles.place} placeholder='contraseña...' type="password" {...register("Password")} />
              </p>

              <p> <input type="checkbox" {...register("EditProp")}  id="edit"/> <label htmlFor="edit">Puede editar valores</label> </p>

            
            </div>
            <input className={styles.send} type="submit" />
          </form>

        </div>
      </div>


      <div className={styles.tabla}>

        <table >
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th>Permisos Editar</th>
              <th>sedes</th>
              <th> Acciones</th>
            </tr>
          </thead>

          <tbody>
            
            { tablaU.map(  (filas,index)=>{  


                return(
                    
                  <tr  key={filas.id}>
                    <td>  {filas.usuario}  </td>
                    <td>  {filas.contrasena}  </td>
                    <td> { filas.edit } </td>
                    <td>  
                      

                      {tabla_permisos.map( (valores,ind)=>  {
                            
                          if(valores.id==filas.id){

                            return(
                            <p key={valores.sede}>  {valores.sede}  </p>)
                          }

                      }  )  }



                    </td>
                    <td>   <button type='button' className={styles.sendE} id={filas.id} onClick={eventManage}>  eliminar </button>  </td>
                  </tr>

                )


              } ) }
          </tbody>
        </table>
      </div>
      


      </div>
      
      
        
        </>  )
}



export async function getServerSideProps(context) {

    
    let sedes=await fetch('http://173.16.10.193:3000/api/getsedes');

    let actualU= await fetch('http://173.16.10.193:3000/api/getusers');
    
    sedes=await sedes.json();

    actualU= await actualU.json();

    console.log(actualU);
    
    
    return {
      props: { sedes,tablaU: actualU }, // will be passed to the page component as props
    }
  }