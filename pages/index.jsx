import Head from 'next/head'
import Image from 'next/image'
import logo from '../public/logo.jpg'
import React from "react";
import { useForm } from "react-hook-form";
import  axios  from 'axios';
import Router from 'next/router'
import styles from '../styles/inicio.module.css'


export default function Home() {

  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {

    
    const res= await axios.post('/api/login',{

      nombre: data.User,
      pass: data.Password

    })
    
    if(res.data=='OK'){
      Router.push(`summary/${data.User}`)
      
    }
    else{alert(res.data);}
    
  

    


  };
  return (

    
      <>
      
      

      <div className={ styles.container }>

          <section className={styles.header}>
              <h1 >Indicadores clinica chia</h1>
              <article className={styles.image_Container}>
                <Image   className={styles.logo}  src={logo} height={200} width={400} />
              </article>
          </section>
          
          
          
         
                  <article className={styles.center11}>
                
                  <button className={styles.box_input} disabled htmlFor="nombre">Usuario:</button>
            
                </article>

                <article className={styles.center12}>

                  <input className={styles.place} placeholder='Escriba su usuario...' id="nombre" type="text" {...register("User")} /> 

                </article>


                <article className={styles.center11}>
                
                <button className={styles.box_input} disabled htmlFor="contra"> Contraseña :</button>
            
                </article>

                <article className={styles.center12}>

                  <input  className={styles.place} placeholder='Escriba su contraseña...' id="contra" type="password" {...register("Password")} /> 

                </article>



                <button className={styles.send}  onClick={handleSubmit(onSubmit)}>  Iniciar Session  </button>
     


          

          
          
          
          
            

      </div>

      

      
      
      </>
    

  )
}
