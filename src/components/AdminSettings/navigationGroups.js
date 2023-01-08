const navigationGroups = [
  {
    headline: "Пользователи",
    navigations: [{ name: "userList", title: "Удалить пользователя" }],
  },
  {
    headline: "Кинотеатры",
    navigations: [
      { name: "addCinema", title: "Добавить кинотеатр" },
      { name: "deleteCinema", title: "Удалить кинотеатр" }
    ],
  },
  {
    headline: "Фильмы",
    navigations: [
      { name: "addMovie", title: "Добавить фильм" },
      { name: "updateMovie", title: "Редактировать фильм" },
      { name: "deleteMovie", title: "Удалить фильм" }
    ],
  },
  {
    headline: "Киносеансы",
    navigations: [
      { name: "addSession", title: "Добавить киносеанс" },
      { name: "updateSession", title: "Редактировать киносеанс" },
      { name: "deleteSession", title: "Удалить киносеанс" }
    ],
  }
];

export default navigationGroups;
