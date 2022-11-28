import { MovieHDRoom } from "../../constants/MovieHD.room";
import { VegasFilmRoom } from "../../constants/VegasFilm.room";
import { WorldScreen } from "../../constants/WorldScreen.room";

export const getCinemasRoom = (id) => {
  const MovieHDRoomIdList = ["637b97a6c4bcbb60ee489b67", "637bdeee0e36ceb230dac4b6"];
  const VegasFilmRoomIdList = ["637be3ae2fc1c3c2b6ae82ff" , "637be3bc2fc1c3c2b6ae8364"];
  const WorldScreenIdList = ["637be648c9562ba5feda44ea", "637be64cc9562ba5feda4569"];

  if (MovieHDRoomIdList.includes(id)) {
    return MovieHDRoom;
  } else if (VegasFilmRoomIdList.includes(id)) {
    return VegasFilmRoom;
  } else if (WorldScreenIdList.includes(id)) {
    return WorldScreen;
  }
};
