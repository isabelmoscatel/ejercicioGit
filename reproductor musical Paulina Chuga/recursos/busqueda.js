//Arreglo canciones

var canciones = [
    'Bohemian Rhapsody',
    'Imagine',
    'Like a Rolling Stone',
    'Billie Jean',
    'Hotel California',
    'Stairway to Heaven',
    'Thriller',
    'Hey Jude',
    'Purple Haze',
    'Smells Like Teen Spirit'
  ];

  //Buscador
  let btnBuscar = document.getElementById("btnBuscar");

  btnBuscar.addEventListener(
    "click",
    function () {
        let inputValue = document.getElementById("inputBuscar").value;
//write expresionto filter the songs arra by regex
        let expresion = new RegExp(inputValue, "i");
 
        let cancionesFiltradas = canciones.filter(
 
            song => expresion.test(song)
        );
        console.log(" resultado de busqueda " + cancionesFiltradas);
 
    }
 
    );