
let GenSQL={};

GenSQL.SQLtextOR = (tabla,col,restricones)=>{

    let estatment='';
    let a=0;

    restricones.forEach(res => {

        
            estatment=estatment+`${tabla}.${col}='${res}' || `;
        
            
        
    });

    estatment=estatment.slice(0,-3);
    
    
    

    return estatment;


}

GenSQL.SQLtextAND= (restricones)=>{

    console.log(restricones);

    let texto='';
    restricones.forEach( el=>{

        if(el.length!=0){
            texto=texto+'('+el+')'+" AND ";
        }

    } )

    texto=texto.slice(0,-4);
    return texto;
}

export {GenSQL};