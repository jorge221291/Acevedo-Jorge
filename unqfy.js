
const picklejs = require('picklejs');

class Track{                                    // Clase Track
  constructor (anAlbum, unString, anInt, genresN){
    this.name=unString;
    this.album=anAlbum;
    this.genres= new Array(String);
    this.genres=genresN;
    this.duration=anInt;
  }

}

class Album{                                    // Clase Album
  constructor (anArtist, aName, aYear){
    this.artistsOfAlbum= anArtist;
    this.name=aName;
    this.year=aYear;

  }
}

class Artist{                                   // Clase Artist
  constructor (aString, aCountry){
    this.name=aString;
    this.country=aCountry;
  }
}

class Playlist{                                 //Clase Playlist
  constructor (aString, genresN, time, listaDeTracks){
    this.name=aString;
    this.genresTotal=new Array(String);
    this.genresTotal=genresN;
    this.totalDuration=time;
    this.totalTracks=new Array(Track);
    this.totalTracks=listaDeTracks;
  }

  duration(){
    return this.totalDuration;
  }

  hasTrack(aTrack){
    return (this.totalTracks.includes(aTrack));
  }
}

class UNQfy {                                   // Clase UNQfy
  constructor(){
    this.tracks= new Array();
    this.artists= new Array(Artist);
    this.albums= new Array(Album);
    this.playlists= new Array(Playlist);
  }

  addArtist(aString, aCountry) {              // Agrega un artista a la lista de artistas de la clase UNQfy
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    const artistaNuevo= new Artist(aString, aCountry);
    this.artists.push(artistaNuevo);
  }

  addAlbum(artistName, albumName, albumYear) {  // Agrega un album a la lista de albums del sistema, en caso de que el artista dueño del album no exista tambien lo cre
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    this.albums.push(new Album(artistName, albumName, albumYear));
  }

  addTrack(albumName, trackName, trackDuraction, trackGenres) { //  Agrega una cancion a la lista de canciones del sistema
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
    this.tracks.push(new Track (albumName, trackName, trackDuraction, trackGenres));
  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */
    this.playlists.push(new Playlist(name, genresToInclude, maxDuration, this.tracks));
  }

  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    const cumplenGeneros= [];                                                     //Recorre la lista de generos 
    for (let index = 0; index < genres.length; index++) {                         //recibida por parametro y le pregunta
      const genero = genres[index];                                               //a cada Track si su lista de generos
      for (let index = 0; index < this.tracks.length; index++) {                  //incluye al genero buscado y si no se
        const cancion = this.tracks[index];                                       //habia pusheado antes (para evitar 
        if (cancion.genres.includes(genero)&&!(cumplenGeneros.includes(cancion))){//repetidos) se pushea.
          cumplenGeneros.push(cancion);
        }
      }
    }
    return cumplenGeneros;
  }      

  getAlbumesDeUnArtista(artist){    //Devuelve una lista de albumes que interpreta un artista
    const listaDeAlbumes=this.albums;
    const albumesResultantes=[];
    for (let index = 0; index < listaDeAlbumes.length; index++) {
      const album = listaDeAlbumes[index];
      if(artist.name===album.artistsOfAlbum){
        albumesResultantes.push(album);
      }
    }
    return albumesResultantes;
  }

  getTracksMatchingArtist(artistName) {   //Le paso un artista y devuelve la lista de canciones asociadas a el
    const listaDeCanciones=this.tracks;
    const albumesResultantes=this.getAlbumesDeUnArtista(artistName);          //Albumes que son del artista
    const cancionesResultantes=[];                                     //Recorro la lista de canciones y los albums que 
    for (let index = 0; index < listaDeCanciones.length; index++) {    //contienen al artista para poder de esta manera 
      const cancion = listaDeCanciones[index];                         //preguntar si el nombre del album del artista
      for (let index = 0; index < albumesResultantes.length; index++) {//es igual a el album que lo contiene.
        const albumQueContieneAlArtista = albumesResultantes[index];   //Estoy comparando Album.name con Track.album,
        if (albumQueContieneAlArtista.name===cancion.album){           //entonces si la cancion pertenece al album que 
          cancionesResultantes.push(cancion);                          //interpreta el artista buscado se pushea.
        }
      }
    }
    return cancionesResultantes;
  }

  getArtistByName(name) {       //Se le pasa el nombre de un artista y devuelve el objeto Artist asociado a el
    const listaDeArtistas=this.artists;
    for (let index = 0; index < listaDeArtistas.length; index++) {
      const artista = listaDeArtistas[index];
      if (artista.name===name){
        return artista;
      }
    }
  }

  getAlbumByName(name) {      //Se le pasa el nombre de un album y devuelve el objeto Album asociado
    const listaDeAlbumes=this.albums;
    for (let index = 0; index < listaDeAlbumes.length; index++) {
      const album = listaDeAlbumes[index];
      if(name===album.name){
        return album;
      }
    }
  }

  getTrackByName(name) {        //Se le pasa el nombre de una canción y devuelve el objeto Track que corresponda
    const listaDeTracks=this.tracks;
    for (let index = 0; index < listaDeTracks.length; index++) {
      const cancion = listaDeTracks[index];
      if(name===cancion.name){
        return cancion;
      }
    }
  }

  getPlaylistByName(name) {     //Se le pasa el nombre de una Playlist y devuelve el objeto Playlist asociado
    const listaDePlaylists=this.playlists;
    for (let index = 0; index < listaDePlaylists.length; index++) {
      const playlist = listaDePlaylists[index];
      if(name===playlist.name){
        return playlist;
      }
    }
  }

  save(filename = 'unqfy.json') {
    new picklejs.FileSerializer().serialize(filename, this);
  }

  static load(filename = 'unqfy.json') {
    const fs = new picklejs.FileSerializer();
    // TODO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy];
    fs.registerClasses(...classes);
    return fs.load(filename);
  }
}

// TODO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy
};

///////////////////////////////////////Utilizado para detección de errores///////////////////////////////////////////
/*

const s= new UNQfy();
s.addArtist('Avril Lavigne', 'USA');
s.addAlbum('Avril Lavigne', 'Best damn thing', 2005);
s.addTrack('Best damn thing', "When you're gone", 300, ['Pop', 'Balada']);
s.addTrack('Best damn thing', "Girlfriend", 300, ['Pop', 'Rock']);
s.addTrack('Best damn thing', "Innocent", 300, ['Pop', 'Balada']);
s.addTrack('Best damn thing', "Best damn thing", 300, ['Diva']);

const artist = s.getArtistByName('Avril Lavigne');
console.log(artist.name);

const track= s.getTrackByName("When you're gone");
console.log(track.name);

const s2= new UNQfy();
const a1=s2.addArtist('guns and rose', 'USA');
s2.addAlbum('guns and rose', 'Appetite for Destruction',1990);
s2.addAlbum('guns and rose', 'album');
s2.addTrack('Appetite for Destruction', 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
s2.addTrack('Appetite for Destruction', "Sweet Child o' Mine", 500, ['rock', 'hard rock', 'pop', 'movie']);
s2.addTrack('Thriller', 'Trhiller', 200, ['pop', 'movie']);
s2.addTrack('Thriller', 'Another song', 500, ['classic']);
s2.addTrack('Thriller', 'Another song II', 500, ['movie']);
s2.addTrack('album', 'cancion', 1,['Cumbia']);

const tracksMatching = s2.getTracksMatchingGenres(['pop', 'movie']);

for (let index = 0; index < tracksMatching.length; index++) {
  const element = tracksMatching[index];
  console.log(element);
}

const busquedaPorArtista= s2.getTracksMatchingArtist(s2.getArtistByName('guns and rose'));



for (let index = 0; index < busquedaPorArtista.length; index++) {
  const element1 = busquedaPorArtista[index];
  console.log(element1); 
}*/
