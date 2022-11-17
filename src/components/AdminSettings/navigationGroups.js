const navigationGroups = [
  {
    headline: "Пользователи",
    navigations: [{ name: "userList", title:"Удалить пользователя" }],
  },
  {
    headline: "Кинотеатры",
    navigations: [
      { name: "addCinema", title:"Добавить кинотеатр" },
      { name: "updateCinema", title:"Редактировать кинотеатр" },
      { name: "deleteCinema", title:"Удалить кинотеатр" }
    ],
  },
  {
    headline: "Кинозалы",
    navigations: [
      { name: "addRoom", title:"Добавить кинозал" },
      { name: "updateRoom", title:"Редактировать кинозал" },
      { name: "deleteRoom", title:"Удалить кинозал" }
    ],
  },
  {
    headline: "Фильмы",
    navigations: [
      { name: "addMovie", title:"Добавить фильм" },
      { name: "updateMovie", title:"Редактировать фильм" },
      { name: "deleteMovie", title:"Удалить фильм" }
    ],
  },
  {
    headline: "Киносеансы",
    navigations: [
      { name: "addSession", title:"Добавить киносеанс" },
      { name: "updateSession", title:"Редактировать киносеанс" },
      { name: "deleteSession", title:"Удалить киносеанс" }
    ],
  }
];

export default navigationGroups;
