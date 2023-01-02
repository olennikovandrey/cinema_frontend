export const getSessionsForUpdateSession = (cinemas, movies) => {
  return cinemas[0].sessions.map(({ _id, movieId, date, time, roomId }) => (
    { _id: _id,
      title: `${ movies.find(item => item._id === movieId).movieInfo.title } / ${ date } / ${ time }`,
      secondValue: roomId
    }
  ));
};

export const getSessionsForDeleteSession = (cinemas, cinemaId, movies) => {
  const currentSessions = cinemas.find(item => item._id === cinemaId).sessions;
  return currentSessions.map(({ _id, movieId, date, time }) => (
    { _id: _id,
      title: `${ movies.find(item => item._id === movieId).movieInfo.title } / ${ date } / ${ time }`,
    }
  ));
};
