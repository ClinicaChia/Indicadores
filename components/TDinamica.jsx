import { useRouter } from 'next/router';
import React, { useState,useEffect } from 'react';
import  axios  from 'axios';
import TablaDinamica from '../components/Tabla';
import Selector from '../components/Selector';
import ChangeTable from '../components/tablaChange';
import styles from  '../styles/id.module.css'


export default function TDinamica(props){

    const years=props.years;
    const meses=props.meses;
    const indicadores=props.indicadores;
    const sedes=props.sedes;
    const especialidades=props.especialidades;
    const tabla=props.data;
    const user=props.user;

    

    
    //Parecido al otro 


 
    
    //Se cargan los estaticos
    const [YearsT,setYearsT]=useState([]);
    const [MesesT,setMesesT]= useState([]);
    const [IndicadoresT,setIndicadoresT]= useState([]);
    const [EspecialdiadesT,setEspecialdiadesT]=useState([]);
    const [BotonesConsultaT,setBotonesConsultaT]= useState(['t','t','t','t']);
    const [SedeA,setSedeA]=useState('');
    const [changeT,setChangeT]=useState([]);
    const [Edit,setEdit]=useState(false);
    useEffect( ()=>{
      if(sedes.length!=0){
        setSedeA(sedes[0]);
      }
    } ,[sedes])

    useEffect( ()=>{
        
      (async ()=>{
          const res=await axios.post( '/api/hello',{user} );
          
          const val= res.data[0].edit=='true'?true:false;

          setEdit(val);

      })()
      

  },[])

    const handleOnChange= (e)=>{
        const id= parseInt(e.target.id);
        if(e.target.type=='button'){
          let temp;
          if(id!=10){ //Botones para consulta 
    
            temp=BotonesConsultaT.map( (val,index)=>{
              if(index==id-1){
                return ( val=='t'?'f':'t')
              }
              return val;
            } )
            
            setBotonesConsultaT(temp);
          }
    
        }

        if(e.target.id=="10"){
            setSedeA(e.target.value);
        }
    
        }






if(years.length!=0 && meses.length!=0 && sedes.length!=0){

        
    
    
    return( 
        <div className={styles.container_td}>


            
          <div className={styles.botoneraT}>

            <h3>Filtros tabla dinamica</h3>

          <div><button className={styles.send} type='button' id='1'  onClick={handleOnChange}>  Años  </button></div>
          <div><button className={styles.send} type='button' id='2'  onClick={handleOnChange}>  Meses  </button></div>
          <div><button className={styles.send} type='button' id='4'  onClick={handleOnChange}>  Especialidades  </button></div>
          <div><button className={styles.send} type='button' id='3'  onClick={handleOnChange}>  Indicadores  </button></div>
 
          

          </div>

          <div className={styles.cheksT}>

            <h3>Campos filtros</h3>

          <Selector key={years.length} titulo="Años Tabla" sellectAll='t' setData={setYearsT} ocultar={BotonesConsultaT[0]} data={years}/>
          <Selector  key={meses.length} titulo="Meses Tabla" sellectAll='t' setData={setMesesT} ocultar={BotonesConsultaT[1]} data={meses}/>
          <Selector  titulo="Indicadores Tabla" sellectAll='t' setData={setIndicadoresT} ocultar={BotonesConsultaT[2]} data={indicadores}/>
          <Selector  key={SedeA} titulo="Indicadores Tabla" sellectAll='t' setData={setEspecialdiadesT} ocultar={BotonesConsultaT[3]} data={SedeA==''? [] : especialidades[SedeA] }/>

          </div>


          <div className={styles.headerT}>
            
              <select  key={sedes.length} id="10" onChange={ handleOnChange }>

                {sedes.map( (val,index)=>{

                    return( <option key={index} value={val}>  {val} </option> )
                } )}
            </select>

            
            
   

          </div>

        
            <div className={styles.t}>
            <TablaDinamica isChange={Edit} sede={SedeA} 
            tablaC={changeT} setTablaC={setChangeT} 
            data={tabla} years={YearsT} meses={MesesT} 
            indicadores={IndicadoresT} especialidades={EspecialdiadesT}/>

            </div>

            <div className={styles.dm}>

               <section className= {Edit==true? '':'hidden'}>
                  <h3> Datos a cambiar </h3>
                  <div className={styles.tab}>
                  <ChangeTable user={user} data={changeT}  />

                  </div>
                  
                </section>

            </div>



         
          

        </div>
)
}

return(  <div></div> )
    
        
     
}