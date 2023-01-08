export const getSessions = cinemas => {
  const workCinemas = cinemas.map(item => {
    return {
      title: item.title,
      _id: item._id,
      sessions: [item.session]
    };
  });

  let cinemaTitle = cinemas[0].title;
  const newCinemas = [];

  for(const item of workCinemas) {
    !newCinemas.length && newCinemas.push(item);

    if(item.title === cinemaTitle) {
      const currentCinema = newCinemas.find(cinema => cinema.title === item.title);
      newCinemas.length && currentCinema.sessions.push(item.sessions[0]);
    } else {
      cinemaTitle = item.title;
      newCinemas.push(item);
    }
  }

  newCinemas[0].sessions.shift();
  return newCinemas;
};
