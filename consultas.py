from ast import Return
from operator import index
import mysql.connector
import pandas as pd
def consulta(sql):
       
       mydb = mysql.connector.connect(
       host="localhost",
       user="root",
       password="Clinica2030*",
       database="indicadores_ok")
       

       query = mydb.cursor()
       
       query.execute(sql)
       
       vals=query.fetchall()
       
       return vals

def get_values(lista):

    values=[]
    for i in lista:
        values.append(i[0])
    return values

def setConsulta(sede,especialidad,indicador):
    txt="SELECT valores.valor FROM  valores inner join meses on meses.id=valores.idmes inner join years on valores.idyear=years.id inner join sedes on valores.idsede=sedes.id inner join indicadores on valores.idindicador=indicadores.id inner join especialidades on valores.idespecialidad=especialidades.id WHERE sedes.sede = '{}' AND especialidades.nombre = '{}' AND years.year = if(MONTH(NOW())-1=0,YEAR(NOW())-1,YEAR(NOW())) AND meses.id = if(MONTH(NOW())-1=0,12,MONTH(NOW())-1) AND indicadores.id = {}"
    sql=txt.format(sede,especialidad,indicador)
    return sql

def FillIndciadores(indicadores):
    temp = []
    i = 0
    for i in range(len(indicadores)+1):
        if i == 12:
            temp.append("Sumatoria del tiempo en minutos de espera desde la hora de programación hasta la atención en Consulta Externa")
        elif i < 12:
            temp.append(indicadores[i])
        else:
            temp.append(indicadores[i-1])
   
    return temp
sedes=consulta('SELECT sede FROM sedes')

sedes = get_values(sedes)

especilidades=consulta('SELECT nombre FROM especialidades')

especilidades = get_values(especilidades)

indicadores = consulta('SELECT nombre_indicador FROM indicadores_ok.indicadores')

indicadores = get_values(indicadores)

indicadores = FillIndciadores(indicadores)


print(indicadores)

tabla = pd.DataFrame(columns=['sede','Especialidad','Indicador','Consulta'])



n=1
for sede in sedes:
    for especialidad in especilidades:
        i = 1
        for indicador in indicadores:
            
            temp= pd.DataFrame([[sede,especialidad,indicador,setConsulta(sede,especialidad,i)]],columns=['sede','Especialidad','Indicador','Consulta'])
           
            i+=1
            tabla=pd.concat([tabla,temp])
            

tabla.to_excel("consultas.xlsx") 
