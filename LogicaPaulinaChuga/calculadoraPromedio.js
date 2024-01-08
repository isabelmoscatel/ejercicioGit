let nombre = prompt("ingresa el nombre del alumno");
let materia = prompt("ingresa la materia");
let notaA = parseInt( prompt("ingresa el primer numero"));
let notaB = parseInt( prompt("ingresa el segundo numero"));
let notaC = parseInt( prompt("ingresa el tercer numero"));
let promedio = null;
let limite1=0;
let limite2=10;
let numeroDeNotas = 3;

if(notaA>=limite1 && notaB>=limite1 && notaC >= limite1 && notaA<=limite2 && notaB<=limite2 && notaC<=limite2){
    promedio = (notaA + notaB+ notaC)/numeroDeNotas;
    if(promedio>=7){
        alert(nombre +" ¡felicidades! Has aprobado con un promedio de " + promedio); 
    }else{
        alert(nombre +" gracias por tu esfuerzo. Nos vemos pronto en clase. El promedio obtenido es  " + promedio); 
    }

}else{
    alert("ingresa notas de 0 a 10");
    pedirNotas();
    calculadora();
}

function calculadora(){
    if(notaA>=limite1 && notaB>=limite1 && notaC >= limite1 && notaA<=limite2 && notaB<=limite2 && notaC<=limite2){
        promedio = (notaA + notaB+ notaC)/numeroDeNotas;
        if(promedio>=7){
            alert(nombre +" ¡felicidades! Has aprobado con un promedio de " + promedio); 
        }else{
            alert(nombre +" gracias por tu esfuerzo. Nos vemos pronto en clase. El promedio obtenido es  " + promedio); 
        }
    
    }else{
        alert("Vuelve a ingresar los datos");
        window.location.reload();
    }
}



function pedirNotas(){
    notaA = parseInt( prompt("ingresa el primer numero"));
    notaB = parseInt( prompt("ingresa el segundo numero"));
    notaC = parseInt( prompt("ingresa el tercer numero"));  
}