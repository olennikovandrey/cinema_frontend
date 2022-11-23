import { MovieHDRoom } from "../../constants/MovieHD.room";
import { VegasFilmRoom } from "../../constants/VegasFilm.room";
import { WorldScreen } from "../../constants/WorldScreen.room";

export const cinemas = Object.freeze({
  MovieHD: ["637b97a6c4bcbb60ee489b67", "637bdeee0e36ceb230dac4b6"],
  VegasFilm: ["637be3ae2fc1c3c2b6ae82ff" , "637be3bc2fc1c3c2b6ae8364"],
  WorldScreen: ["637be648c9562ba5feda44ea", "637be64cc9562ba5feda4569"]
});

export const getCinemasRoom = new Map()
  .set(cinemas.MovieHD[0], MovieHDRoom)
  .set(cinemas.MovieHD[1], MovieHDRoom)
  .set(cinemas.VegasFilm[0], VegasFilmRoom)
  .set(cinemas.VegasFilm[1], VegasFilmRoom)
  .set(cinemas.WorldScreen[0], WorldScreen)
  .set(cinemas.WorldScreen[1], WorldScreen);
