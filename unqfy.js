
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

class Playlist{
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

  addArtist(aString, aCountry) {              // Agrega un artista a la lista de artistas del sistema
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
    const cumplenGeneros= [];
    for (let index = 0; index < genres.length; index++) {
      const genero = genres[index];
      for (let index = 0; index < this.tracks.length; index++) {
        const cancion = this.tracks[index];
        if (cancion.genres.includes(genero)&&!(cumplenGeneros.includes(cancion))){
          cumplenGeneros.push(cancion);
        }
      }
    }
    return cumplenGeneros;
  }      

  getTracksMatchingArtist(artistName) {
    const listaDeAlbumes=this.albums;
    const listaDeCanciones=this.tracks;
    const albumesResultantes=[];
    const cancionesResultantes=[];
    for (let index = 0; index < listaDeAlbumes.length; index++) {
      const album = listaDeAlbumes[index];
      if(artistName.name===album.artistsOfAlbum){
        albumesResultantes.push(album);
      }
    }
    for (let index = 0; index < listaDeCanciones.length; index++) {
      const cancion = listaDeCanciones[index];
      for (let index = 0; index < albumesResultantes.length; index++) {
        const element = albumesResultantes[index];
        if (element.name===cancion.album){
          cancionesResultantes.push(cancion);
        }
      }
    }
    return cancionesResultantes;
  }

  getArtistByName(name) {
    const listaDeArtistas=this.artists;
    for (let index = 0; index < listaDeArtistas.length; index++) {
      const element = listaDeArtistas[index];
      if (element.name===name){
        return element;
      }
    }
  }

  getAlbumByName(name) {
    for (let index = 0; index < this.albums.length; index++) {
      const element = this.albums[index];
      if(this.esLoQueBusco(name, element)){
        return element;
      }
    }
  }

  getTrackByName(name) {
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      if(this.esLoQueBusco(name, element)){
        return element;
      }
    }
  }

  getPlaylistByName(name) {
    for (let index = 0; index < this.playlists.length; index++) {
      const playlist = this.playlists[index];
      if(this.esLoQueBusco(name, playlist)){
        return playlist;
      }
    }
  }

  esLoQueBusco(aString, aThing){  //Compara un string con el string(nombre) de un objeto
    return (aString===aThing.name);
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
}
