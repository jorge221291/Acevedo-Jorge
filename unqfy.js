
const picklejs = require('picklejs');

class Track{
  constructor (unString, anAlbum, anArtist, genere1, ...genereN){
    this.genres=unString;
    this.album=anAlbum;
    this.artist= new Array(Artist);
    this.artist.push(anArtist);
    this.generes= new Array(String);
    this.generes.push(genere1, ...genereN);
  }

}

class Album{
  constructor (anArtist, aName, aYear){
    this.artistsOfAlbum= new Array(Artist);
    this.artistsOfAlbum.push(anArtist);
    this.name=aName;
    this.year=aYear;

  }
}

class Artist{
  constructor (aString, aCountry){
    this.name=aString;
    this.country=aCountry;
  }
}

class UNQfy {
  constructor(){
    this.tracks= new Array();
    this.artists= new Array(Artist);
    this.albums= new Array(Album);
  }
  getTracksMatchingGenres(genres) {
    // Debe retornar todos los tracks que contengan alguno de los generos en el parametro genres
    const cumplenGeneros= new Array(String);
    for (let index = 0; index < genres.length; index++) {
      const element = genres[index];
      for (let index = 0; index < this.tracks.length; index++) {
        const element2 = this.tracks[index];
        if (element2.generes.includes(element)){
          cumplenGeneros.push(element2);
        }
      }
    }
    return cumplenGeneros;
  }
        
          

  getTracksMatchingArtist(artistName) {
    const listaResultante=[];
    this.tracks.forEach(element => { if (this.estaElArtista(element.artist, artistName)){
      listaResultante.push(element);
    }})
    return (listaResultante);
  }

  estaElArtista(artistList, anArtist){
    let estaEnLaLista=false;
    artistList.forEach(element => { if (element===anArtist){
      estaEnLaLista= true;}})
    return estaEnLaLista;
  }
      


  /* Debe soportar al menos:
     params.name (string)
     params.country (string)
  */
  addArtist(aString, aCountry) {
    // El objeto artista creado debe soportar (al menos) las propiedades name (string) y country (string)
    this.artists.push(new Artist(aString, aCountry));
  }


  addAlbum(artistName, albumName, albumYear) {
    // El objeto album creado debe tener (al menos) las propiedades name (string) y year
    this.albums.push(new Album(artistName, albumName, albumYear));
  }


  /* Debe soportar (al menos):
       params.name (string)
       params.duration (number)
       params.genres (lista de strings)
  */
  addTrack(albumName, trackName, trackDuraction, trackGenres) {
    /* El objeto track creado debe soportar (al menos) las propiedades:
         name (string),
         duration (number),
         genres (lista de strings)
    */
    this.tracks.push(new Track (albumName, trackName, trackDuraction, trackGenres));
  }

  getArtistByName(name) {
    for (let index = 0; index < this.artists.length; index++) {
      const element = this.artists[index];
      if (element.name===name){
        return element;
      }
    }
  }

  getAlbumByName(name) {
    for (let index = 0; index < this.albums.length; index++) {
      const element = this.albums[index];
      if(this.esElAlbum(name, element)){
        return(element);
      }
    }
  }

  esElAlbum(aString, anAlbum){
    return(aString===anAlbum.name);
  }

  getTrackByName(name) {
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      if(this.esElTrack(name, element)){
        return element;
      }
    }
  }

  esElTrack(aString, aTrack){
    return (aString===aTrack.name);
  }

  getPlaylistByName(name) {

  }

  addPlaylist(name, genresToInclude, maxDuration) {
    /* El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist
    */

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
  UNQfy,
};

const s= new UNQfy();
s.addArtist('guns and Rose', 'GUNS');

const artist = s.getArtistByName('guns and Rose');
console.log(artist.name);