/* Variables globales */
let mute = false;//mute reproductor
let countPlay = 0;
let isPlaying = false;
let numCurrentCancion = 0;


/* Reviso si nos encontramos loggeados */
if (!localStorage.getItem('isLogged')) {
    window.location.href = './pages/login.html';
}

//clase cancion
class Cancion {
    constructor(id, nombre, autor, duracion, album, anio, genero, cover, urlSong) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.duracion = duracion;
        this.album = album;
        this.anio = anio;
        this.genero = genero;
        this.cover = cover;
        this.urlSong = urlSong;
    }

    getCancionNombre() {
        return this.nombre;
    }
    getCancionAutor() {
        return this.autor;
    }
    getCancionDuracion() {
        return this.duracion;
    }
    getCancionAlbum() {
        return this.album;
    }
    getCancionAnio() {
        return this.anio;
    }
    getCancionGenero() {
        return this.genero;
    }
    getCancionCover() {
        return this.cover;
    }
    getCancionUrlSong() {
        return this.urlSong;
    }
}

/*---------------clase cancion---------------*/
class Playlist {
    constructor(nombre, listaCanciones) {
        this.nombre = nombre;
        this.listaCanciones = listaCanciones;
    }

    getPlaylistNombre() {
        return this.nombre;
    }
    getPlaylistCanciones() {
        return this.listaCanciones;
    }
    addCancionPlaylist(cancion) {
        this.listaCanciones.push(cancion);
    }

    dibujarCanciones() {
        let canciones = document.getElementById(this.nombre);
        let alterna = "";
        let alterna2 = "";
        let className1 = "";
        let className2 = "";
        switch (this.nombre) {
            case 'resFavoritos':
                alterna2 = "fa-solid fa-plus";
                alterna = "fa-regular fa-heart";
                className1 = "btnSongFavoritosPlay";
                className2 = "btnREmove";
                canciones.innerHTML = '';
                this.listaCanciones.forEach(cancion => {
                    canciones.innerHTML += `
                    <div class="song-box" dataIdCancion ='${cancion.id}'>
                            <div class="song-info cancion" dataIdCancion ='${cancion.id}' >${cancion.nombre} </div>
                            
                            <button class="${className1} btn-song fa-solid fa-play" dataIdCancion ='${cancion.id}'></button>
                            <button class="${className2} btn-song ${alterna}" dataIdCancion ='${cancion.id}'></button>                
                           
                        </div>
                    `;
                });
                break;
            case 'resPlaylist':
                alterna2 = "fa-solid fa-minus";
                alterna = "fa-solid fa-heart";
                className1 = "btnSongPlayListPlay";
                className2 = "BtnRemovePlaylist"
                canciones.innerHTML = '';
                this.listaCanciones.forEach(cancion => {
                    canciones.innerHTML += `
                    <div class="song-box" dataIdCancion ='${cancion.id}'>
                            <div class="song-info cancion" dataIdCancion ='${cancion.id}' >${cancion.nombre} </div>
                            
                            <button class="${className1} btn-song fa-solid fa-play" dataIdCancion ='${cancion.id}'></button>            
                            <button class="${className2} btn-song  ${alterna2}" dataIdCancion ='${cancion.id}'></button>
                            
                           
                        </div>
                    `;
                });
                break;
        }
        this.onPlaySong(className1);
        this.onRemoveCancion(className2);
    }

    /*---------------Evento personalizado Remueve cacnciones---------------*/
    onRemoveCancion(nameClass) {
        let btnRemove = document.getElementsByClassName(nameClass);
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", () => {
                let id = btnRemove[i].getAttribute('dataIdCancion');
                let song = this.listaCanciones.find(cancion => cancion.id == id);
                let event = new CustomEvent('eventRemove', {
                    detail: {
                        cancionId: song.id,
                        actual: this.nombre

                    },
                });
                document.dispatchEvent(event);
            });
        }

    }

    /*---------------Evento personalizado da play---------------*/
    onPlaySong(nameClass) {
        let btnPlay = document.getElementsByClassName(nameClass);
        for (let i = 0; i < btnPlay.length; i++) {
            btnPlay[i].addEventListener("click", () => {
                let id = btnPlay[i].getAttribute('dataIdCancion');
                let song = this.listaCanciones.find(cancion => cancion.id == id);
                let event = new CustomEvent('eventPlaySongs', {
                    detail: {
                        cancion: song,
                        actual: this.nombre
                    },
                });
                document.dispatchEvent(event);
            });
        }
    }


    removeCancionById(id) {
        const cancionIndex = this.listaCanciones.findIndex(cancion => cancion.id == id);

        if (cancionIndex !== -1) {
            const cancionEliminada = this.listaCanciones.splice(cancionIndex, 1)[0];
            console.log(`Canción eliminada: ${cancionEliminada.nombre}`);
        } else {
            console.log(`No se encontró la canción con ID ${id}`);
        }
    }

}

/*---------------Clase Reproductor---------------*/
class Reproductor {
    catalogoDeCanciones;
    currentCancion;
    audio;
    filtroDeCanciones;
    currentPlaylist;
    numCurrentCancion = 0;
    favoritos;
    myPlaylist;

    constructor() {
        this.catalogoDeCanciones = [
            new Cancion(1, "amor", "autor1", "duracion1", "amor", "año1", "genero1", "portadas/1.webp", "canciones/1.mp3"),
            new Cancion(2, "cancion2", "autor2", "duracion2", "album2", "año2", "genero2", "portadas/2.webp", "canciones/2.mp3"),
            new Cancion(3, "cancion3", "autor3", "duracion3", "album3", "año3", "genero3", "portadas/3.webp", "canciones/3.mp3"),
            new Cancion(4, "cancion4", "autor1", "duracion4", "album4", "año4", "genero4", "portadas/4.webp", "canciones/4.mp3"),
            new Cancion(5, "cancion5", "autor5", "duracion5", "album5", "año5", "genero5", "portadas/5.webp", "canciones/5.mp3"),
            new Cancion(6, "cancion6", "autor6", "duracion6", "amor", "año6", "genero6", "portadas/6.webp", "canciones/6.mp3"),
            new Cancion(7, "cancion7", "autor7", "duracion7", "album7", "año7", "genero7", "portadas/7.webp", "canciones/7.mp3"),
            new Cancion(8, "cancion8", "autor8", "duracion8", "album8", "año8", "genero8", "portadas/8.webp", "canciones/8.mp3"),
            new Cancion(9, "cancion9", "autor9", "duracion9", "album9", "año9", "genero9", "portadas/8.webp", "canciones/9.mp3"),
            new Cancion(10, "cancion10", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/10.webp", "canciones/10.mp3"),
            new Cancion(11, "cancion11", "autor10", "duracion10", "album10", "año10", "genero11", "portadas/11.webp", "canciones/11.mp3"),
            new Cancion(12, "cancion12", "autor10", "duracion10", "album10", "año10", "genero12", "portadas/12.webp", "canciones/12.mp3"),
            new Cancion(13, "cancion13", "autor10", "duracion10", "album10", "año10", "genero13", "portadas/13.webp", "canciones/13.mp3"),
            new Cancion(14, "cancion14", "autor10", "duracion10", "album10", "año10", "genero14", "portadas/14.webp", "canciones/14.mp3"),
            new Cancion(15, "cancion15", "autor10", "duracion10", "album10", "año10", "genero15", "portadas/15.webp", "canciones/15.mp3"),
            new Cancion(16, "cancion16", "autor10", "duracion10", "album10", "año10", "genero16", "portadas/16.webp", "canciones/16.mp3"),
            new Cancion(17, "cancion17", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/17.webp", "canciones/17.mp3"),
            new Cancion(18, "cancion18", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/18.webp", "canciones/18.mp3"),
            new Cancion(19, "cancion19", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/19.webp", "canciones/19.mp3"),
            new Cancion(20, "cancion20", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/20.webp", "canciones/20.mp3"),
            new Cancion(21, "cancion21", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/21.webp", "canciones/21.mp3"),
            new Cancion(22, "cancion22", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/22.webp", "canciones/22.mp3"),
            new Cancion(23, "cancion23", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/23.webp", "canciones/23.mp3"),
            new Cancion(24, "cancion24", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/24.webp", "canciones/24.mp3"),
            new Cancion(25, "cancion25", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/25.webp", "canciones/25.mp3"),
            new Cancion(26, "cancion26", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/26.webp", "canciones/26.mp3"),
            new Cancion(27, "cancion27", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/27.webp", "canciones/27.mp3"),
            new Cancion(28, "cancion28", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/28.webp", "canciones/28.mp3"),
            new Cancion(29, "cancion29", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/29.webp", "canciones/29.mp3"),
            new Cancion(30, "cancion30", "autor10", "duracion10", "album10", "año10", "genero10", "portadas/30.webp", "canciones/30.mp3"),
        ];
        this.currentCancion = this.catalogoDeCanciones[numCurrentCancion];
        this.audio = new Audio;
        this.currentPlaylist = 'busqueda';
        this.favoritos = new Playlist('resFavoritos', []);
        this.myPlaylist = new Playlist('resPlaylist', []);
        this.mostrarCanciones(this.catalogoDeCanciones);
        this.inicializarControles();
    }

    inicializarControles() {//Eventos
        /*---------------Evento Buscar---------------*/
        let buscar = document.getElementById("btnBuscar");
        buscar.addEventListener("click", () => {
            this.buscarCancion(document.getElementById("inputBuscar").value);
            document.getElementById("inputBuscar").value = "";

        });

        /*---------------Evento Play---------------*/
        let play = document.getElementById("play-btn");
        play.addEventListener("click", () => {
            this.playCancion();
        });

        /*---------------Evento Pause---------------*/
        let pause = document.getElementById("pause-btn");
        pause.addEventListener("click", () => {
            this.pauseCancion();
        })

        /*---------------Evento Mute---------------*/
        let mute = document.getElementById("mute-btn");
        mute.addEventListener("click", () => {
            this.muteCancion();

        })

        /*---------------Evento Stop---------------*/
        let stop = document.getElementById("stop-btn");
        stop.addEventListener("click", () => {
            this.stopCancion();
            // botonesPlay();
        });

        /*---------------Evento Siguiente---------------*/
        let siguiente = document.getElementById('siguiente-btn');
        siguiente.addEventListener("click", () => {
            this.siguienteCancion();
            countPlay = 0;
            this.playCancion();
        })

        /*---------------Evento Audio Ended---------------*/
        this.audio.addEventListener('ended', () => {
            this.siguienteCancion();
            countPlay = 0;
            this.playCancion();

        })


        /*---------------Evento Personalizado---------------*/
        document.addEventListener('eventPlaySongs', (e) => {
            this.currentCancion = e.detail.cancion;
            countPlay = 0;
            this.currentPlaylist = (e.detail.actual);

            this.playCancion();

        });

        /*---------------Evento Personalizado---------------*/
        document.addEventListener('eventRemove', (e) => {
            let id = e.detail.cancionId;
            let playlist = e.detail.actual;
            this.removeCanciones(id, playlist);


            this.mostrarCanciones(this.catalogoDeCanciones);

        });

        /*---------------Muestro todas las canciones de Buscar---------------*/
        let reiniciarBtn = document.getElementById('reiniciarBtn');
        reiniciarBtn.addEventListener("click", () => {
            this.canciones.innerHTML == " ";
            this.mostrarCanciones(this.catalogoDeCanciones);
        })

    }


    removeCanciones = function (id, playlist) {
        switch (playlist) {
            case 'resFavoritos':
                this.favoritos.removeCancionById(id);
                this.favoritos.dibujarCanciones();

                let favoritosBtn = document.getElementsByClassName('likeBtn');
                for (let i = 0; i < favoritosBtn.length; i++) {
                    let idAtributo = favoritosBtn[i].parentElement.getAttribute('dataIdCancion');
                    if (idAtributo == id) {
                        favoritosBtn[i].style.display = "block";
                    }

                }

                break;
            case 'resPlaylist':
                this.myPlaylist.removeCancionById(id);
                this.myPlaylist.dibujarCanciones();
                let miPlaylistBtn = document.getElementsByClassName('addBtn');
                for (let i = 0; i < miPlaylistBtn.length; i++) {
                    let idAtributo = miPlaylistBtn[i].parentElement.getAttribute('dataIdCancion');
                    if (idAtributo == id) {
                        miPlaylistBtn[i].style.display = "block";
                    }

                }
                break;
        }
    }

    mostrarCanciones(arregloCanciones) {
        let canciones = document.getElementById("resBusqueda");
    
        arregloCanciones.forEach(cancion => {
            

            canciones.innerHTML += `
            <div class="song-box" dataIdCancion ='${cancion.id}'>
                    <div class="song-info cancion" dataIdCancion ='${cancion.id}' >${cancion.nombre} </div>
                    
                    <button class="playBtn1 btn-song fa-solid fa-play"  dataIdCancion ='${cancion.id}'></button>
                    <button class="likeBtn btn-song fa-solid fa-heart" dataIdCancion ='${cancion.id}'></button>                
                    <button class="addBtn btn-song fa-solid fa-plus" dataIdCancion ='${cancion.id}'></button>
                   
                </div>
            `;

        });

        let playBtn = document.getElementsByClassName("playBtn1");

        for (let i = 0; i < playBtn.length; i++) {
            playBtn[i].addEventListener("click", () => {

                this.currentPlaylist = 'busqueda';
                let id = playBtn[i].parentElement.getAttribute('dataIdCancion');

                this.currentCancion = this.catalogoDeCanciones.find(cancion => cancion.id == id);
                countPlay = 0;
                this.playCancion()
            })
        }

        let favoritosBtn = document.getElementsByClassName('likeBtn');
        for (let i = 0; i < favoritosBtn.length; i++) {
            favoritosBtn[i].addEventListener("click", () => {
                let id = favoritosBtn[i].parentElement.getAttribute('dataIdCancion');
                this.addPlaylist(id, 'favoritos');
                favoritosBtn[i].style.display = "none";//Oculta boton


            })
        }

        let miPlaylistBtn = document.getElementsByClassName('addBtn');
        for (let i = 0; i < miPlaylistBtn.length; i++) {
            miPlaylistBtn[i].addEventListener("click", () => {
                let id = miPlaylistBtn[i].parentElement.getAttribute('dataIdCancion');
                this.addPlaylist(id, 'myPlaylist');
                miPlaylistBtn[i].style.display = "none";//Oculta boton
            })
        }

    }

    addPlaylist = function (id, playlist) {
        let cancionAdd = this.catalogoDeCanciones.find(cancion => cancion.id == id);
        switch (playlist) {
            case 'favoritos':
                this.favoritos.addCancionPlaylist(cancionAdd);
                this.favoritos.dibujarCanciones();

                break;
            case 'myPlaylist':
                this.myPlaylist.addCancionPlaylist(cancionAdd);
                this.myPlaylist.dibujarCanciones();
                break;
        }
    }

    buscarCancion(inputUser) {
        inputUser = inputUser.trim(inputUser);
        let canciones = document.getElementById("resBusqueda");
        if (canciones.innerHTML == "") {
            this.mostrarCanciones(this.catalogoDeCanciones);
        } else {
            canciones.innerHTML = "";
            let resNombre = this.catalogoDeCanciones.filter(cancion => cancion.nombre.match((inputUser)));
            let resAlbum = this.catalogoDeCanciones.filter(cancion => cancion.album.match((inputUser)));
            let resAutor = this.catalogoDeCanciones.filter(cancion => cancion.autor.match((inputUser)));
            let resGenero = this.catalogoDeCanciones.filter(cancion => cancion.genero.match((inputUser)));

            this.filtroDeCanciones = [...resNombre, ...resAutor, ...resAlbum, ...resGenero];
            this.filtroDeCanciones = [...new Set(this.filtroDeCanciones)];
            this.mostrarCanciones(this.filtroDeCanciones);
            console.log(this.filtroDeCanciones);
        }
    }

    playCancion() {

        isPlaying = true;
        if (countPlay == 0) {//reivisa si ya hizo play por primera vez
            this.datosCancion();
            this.audio.src = this.currentCancion.urlSong;
            countPlay++;
        }
        if (this.currentCancion !== undefined) {
            this.audio.play();
            this.cambiarPortada();
        }
    }

    pauseCancion() {
        this.audio.pause();
        isPlaying = false;

    }

    stopCancion() {
        this.audio.src = this.currentCancion.urlSong;
        isPlaying = false;
    }

    muteCancion() {
        let bgBoton = document.getElementById('mute-btn');
        if (!mute) {
            this.audio.volume = 0;
            bgBoton.style.backgroundColor = "palevioletred";
            mute = true;
        } else {
            this.audio.volume = 1;
            bgBoton.style.backgroundColor = "lightblue";
            mute = false;
        }
    }

    cambiarPortada() {
        const portada = document.getElementById("imgPortada");
        portada.src = this.currentCancion.cover;
    }

    datosCancion() {
        const nombre = document.getElementById('nombreCancion');
        const duracion = document.getElementById('duracionCancion');
        const album = document.getElementById('albumCancion');
        const artista = document.getElementById('autorCancion');
        const anio = document.getElementById('anioCancion');
        const genero = document.getElementById('generoCancion');
        nombre.innerHTML = this.currentCancion.nombre;
        duracion.innerHTML = this.currentCancion.duracion;
        album.innerHTML = this.currentCancion.album;
        artista.innerHTML = this.currentCancion.autor;
        anio.innerHTML = this.currentCancion.anio;
        genero.innerHTML = this.currentCancion.genero;
    }

    siguienteCancion() {
        let listaDeCanciones;
        countPlay = 0;

        switch (this.currentPlaylist) {
            case 'busqueda':
                console.log("estoy en busqueda");
                listaDeCanciones = this.catalogoDeCanciones;
                break;
            case 'resFavoritos':
                console.log("estoy en favoritos");
                listaDeCanciones = this.favoritos.getPlaylistCanciones();
                break;
            case 'resPlaylist':
                console.log("estoy en playlist");
                listaDeCanciones = this.myPlaylist.getPlaylistCanciones();
        }
        numCurrentCancion = listaDeCanciones.indexOf(this.currentCancion);

        if (numCurrentCancion == listaDeCanciones.length - 1) {
            numCurrentCancion = 0;
            this.currentCancion = listaDeCanciones[numCurrentCancion];
        } else {
            console.log("current cancion: " + numCurrentCancion);
            numCurrentCancion += 1;
            this.currentCancion = listaDeCanciones[numCurrentCancion];

        }
    }

}

let reproductor = new Reproductor();



