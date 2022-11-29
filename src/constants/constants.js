import sofa from "../assets/images/room/sofa.svg";
import sofa_occupied from "../assets/images/room/sofa_occupied.svg";
import sofa_selected from "../assets/images/room/sofa_selected.svg";
import armchair from "../assets/images/room/armchair.svg";
import armchairLux from "../assets/images/room/armchairLux.svg";

export const searchOptionValues = [
  { value: "По названию", criterion: "title" },
  { value: "По режиссеру", criterion: "producer" },
  { value: "По актеру", criterion: "actor" },
  { value: "По стране", criterion: "country" },
  { value: "По жанру", criterion: "genre" },
];

export const userRole = Object.freeze({ admin: "ADMIN" });

export const moviesSwiperSettings = {
  slidesPerView: 9,
  loop: true,
  mousewheel: true,
  navigation: true,
  effect: "cube",
  keyboard: true,
  centeredSlides: true,
  autoplay: { delay: 7000, pauseOnMouseEnter: true, disableOnInteraction: false },
  breakpoints: {
    1800: {
      slidesPerView: 8
    },
    1440: {
      slidesPerView: 6
    },
    1280: {
      slidesPerView: 5
    },
    1024: {
      slidesPerView: 4
    },
    768: {
      slidesPerView: 3
    },
    360: {
      slidesPerView: 2
    },
    320: {
      slidesPerView: 1
    },
  }
};

export const moviesIntoCinemaSwiperSettings = {
  slidesPerView: 1,
  mousewheel: true,
  navigation: true,
  effect: "cube",
  keyboard: true,
  centeredSlides: true
};

export const baseUrl = "http://localhost:4000";

export const urls = {
  login: `${ baseUrl }/auth/login`,
  register: `${ baseUrl }/auth/registration`,
  checkIsAuth: `${ baseUrl }/auth/checkisauth`,
  addCinema: `${ baseUrl }/admin/cinemas/addcinemas`,
  addRoom: `${ baseUrl }/admin/rooms/addrooms`,
  addMovie: `${ baseUrl }/admin/movies/addmovies`,
  updateCinema: `${ baseUrl }/admin/cinemas/updatecinemas`,
  updateRoom: `${ baseUrl }/admin/rooms/updaterooms`,
  updateMovie: `${ baseUrl }/admin/movies/updatemovies`,
  updateUser: `${ baseUrl }/auth/updateuser`,
  deleteCinema: `${ baseUrl }/admin/cinemas/deletecinemas`,
  deleteMovie: `${ baseUrl }/admin/movies/deletemovies`,
  deleteUser: `${ baseUrl }/admin/users/deleteusers`,
  getMyData: `${ baseUrl }/auth/getmydata`,
  getAllUsers: `${ baseUrl }/admin/users/getallusers`,
  getAllMovies: `${ baseUrl }/movies/all/getallmovies`,
  getAllCinemas: `${ baseUrl }/cinemas/all/getallcinemas`,
  getAllRooms: `${ baseUrl }/room/getallrooms`,
  selectseat: `${ baseUrl }/room/selectseat`,
  massUnselectSeats: `${ baseUrl }/room/massunselectseats`,
  occupySeat: `${ baseUrl }/room/occupiseat`,
  buyTickets: `${ baseUrl }/room/payment`
};

export const seatTypes = [
  {
    title: "Sofa",
    price: 30,
    image: sofa,
    description: "Двухместные невероятно мягкие диванчики. Комфорт этого кресла моментально позволит вам расслабиться и почувствовать себя как дома. Цена указана за двойное место."
  },
  {
    title: "Armchair",
    price: 12,
    image: armchair,
    description: "Одноместное удобное кресло, имеющее длинную мягкую спинку, комфортное сидение и свой подстаканник. Эргономика кресла позволит вам отдохнуть и насладиться просмотром."
  },
  {
    title: "Armchair Lux",
    price: 17,
    image: armchairLux,
    description: "Комфортное кресло на одного человека с возможностью регулировки наклона спинки и высоты подставки для ног. Каждое кресло имеет свой личный столик. Благодаря инновационному механизму, вы можете смотреть фильм практически в горизонтальном положении, при этом всё ещё находясь в кресле в кинозале."
  },
];

export const roomSeatTypes = Object.freeze({
  sofa: "sofa",
  armchair: "armchair",
  armchairLux: "armchairLux"
});

export const furnitureItemTitle = new Map()
  .set(roomSeatTypes.sofa, "Sofa")
  .set(roomSeatTypes.armchair, "Armchair")
  .set(roomSeatTypes.armchairLux, "Armchair Lux");

export const roomLegend = [
  {
    image: sofa,
    alt: "free_seat",
    value: "- свободно"
  },
  {
    image: sofa_occupied,
    alt: "occupied",
    value: "- занято"
  },
  {
    image: sofa_selected,
    alt: "selected",
    value: "- выбрано"
  },
];

export const STRIPE_PUBLIC_KEY = "pk_test_51M89aKEhipLO19N11C4bASqXiammsBg5B14CmRMVVesr00z2t4itHImZKWAGqseicKtvbHSEG5dcGFETrViww63400dxWVZcYq";
