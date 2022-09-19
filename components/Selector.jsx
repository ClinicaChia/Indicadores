import Head from 'next/head'
import { useForm } from "react-hook-form";
import  axios  from 'axios';
import Router from 'next/router'
import React, { useState,useEffect } from 'react';
import styles from  '../styles/id.module.css'

const useCheck=(dataCheck)=>{
    const [check,setCheck]=useState(dataCheck);

    const UpdateArray= (index)=>{

        const temp=check.map( (val,ind)=>{

            if(ind==index){
                return (val==true?false:true);
            }
            return val;
        } )

        setCheck(temp);
    }

    const GetData=(data)=>{
        let temp=[];
        check.forEach((el,index) => {

            if(el && data[index]!=undefined){
                temp.push(data[index]);
            }
            
        });
        return temp;
    }

    
    const AllTrue= (valN)=>{

        const temp=check.map( (val,ind)=>{

            return valN;
        } )

        setCheck(temp);
    }
    return( [check,setCheck,UpdateArray,GetData,AllTrue])
}

export default function Selector(props){

    const data=props.data;
    const titulo=props.titulo;
    const IsHidden=props.ocultar;
    const SetData=props.setData;
    const dataCheck=data.map( ()=>{return (props.sellectAll=='t'?true:false)} );

   
    //

    const [check,setCheck,UpdateItem,GetData,turnTrue]= useCheck(dataCheck);
    
    
    useEffect( ()=>{

        SetData(GetData(data));
        
    },[check]);

    const handleEvent= (e)=>{
        const id=parseInt(e.target.value);
        if(id!=-1){
            UpdateItem(id);
        }
        else{
            
            turnTrue(e.target.checked)}
        

    }
    
    return(

        <>
        
        <div className={IsHidden=='t'?"hidden":""}>
                    <h3>{titulo}</h3>
        <div className={styles.lista}>
                    <div>
                        <input type="checkbox" name={titulo} 
                        value={-1}
                        onChange={handleEvent}/>
                        <label >Selecionar todos</label>
                    </div>

                    {dataCheck.map( (val,id)=>{
                    return( 

                    <div  key={id+1}>
                        <input type="checkbox" name={titulo} 
                        value={id}  checked={check[id]}
                        onChange={handleEvent}/>
                        <label >{data[id]}</label>
                    </div>



                    )
                    } )}
            
        </div>

        </div>
            
       

        </>
    )
}