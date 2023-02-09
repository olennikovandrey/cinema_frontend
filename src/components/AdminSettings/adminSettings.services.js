export const handleBlur = (e, stateFn, stateField) => {
  stateFn(prevState => ({
    ...prevState,
    [stateField]: e.target.value
  }));
}; //addMovie, addCinema

export const handleChange = (e, stateFn, stateField) => {
  stateFn(prevState => ({
    ...prevState,
    [stateField]: e.target.value.split(" ")[0].trim()
  }));
}; //updateCinema, addSession

export const handleBlurForSeveralValues = (e, stateFn, movieField) => {
  const wordsAmount = e.target.value.split(", ").length;
  stateFn(prevState => ({
    ...prevState,
    [movieField]: wordsAmount ? e.target.value.split(", ") : e.target.value
  }));
}; //addMovie

export const handleBlurForInputsGroup = (e, stateFn, [movieField, movieFieldKey]) => {
  stateFn(prevState => ({
    ...prevState,
    [movieField]:
      { ...prevState[movieField], [movieFieldKey]: e.target.value }
  }));
}; //addMovie

export const handleBlurForEditableInput = (e, stateFn, path) => {
  stateFn(prevState => ({
    ...prevState,
    [path]: e.target.innerText === "" ? prevState : e.target.innerText
  }));
}; //updateMovie

export const handleChangeForEditableSeveralValues = (e, stateFn, path) => {
  stateFn(prevState => ({
    ...prevState,
    [path]: e.target.innerText === "" ? prevState : e.target.innerText.split(", ")
  }));
}; //updateMovie

export const handleBlurForEditableInputsGroup = (e, stateFn, [movieField, movieFieldKey]) => {
  stateFn(prevState => ({
    ...prevState,
    [movieField]: [{
      ...prevState[movieField][0], [movieFieldKey]: e.target.innerText === "" ? prevState : e.target.innerText
    }]
  }));
}; //updateMovie

export const handlerChangeForSelect = (e, stateFn, [movieField, movieFieldKey]) => {
  stateFn(prevState => ({
    ...prevState,
    [movieField]: {
      ...prevState[movieField], [movieFieldKey]: e.target.value.trim()
    }
  }));
}; //updateMovie

export const handlerChangeForSecondValue = (e, stateFn, [movieField, movieFieldKey]) => {
  stateFn(prevState => ({
    ...prevState,
    [movieField]:  {
      ...prevState[movieField], [movieFieldKey]: e.target.value.split(" ")[1].trim()
    }
  }));
}; //updateMovie

export const sortMovies = movies => {
  return movies.sort((a, b) => a.movieInfo.title.toLowerCase() < b.movieInfo.title.toLowerCase() && -1);
};

const getDay = date => {
  if (date[0] === "0") return date.slice(1);
  return date;
};

const months = new Map()
  .set("01", "января")
  .set("02", "февраля")
  .set("03", "марта")
  .set("04", "апреля")
  .set("05", "мая")
  .set("06", "июня")
  .set("07", "июля")
  .set("08", "августа")
  .set("09", "сентября")
  .set("10", "октября")
  .set("11", "ноября")
  .set("12", "декабря");

export const setCorrectDate = (e, stateFn, path) => {
  const date = e.target.value.split("-").reverse();

  const newDate = `${ getDay(date[0]) } ${ months.get(date[1]) } ${ date[2] } г.`;
  stateFn(prevState => ({
    ...prevState,
    [path]: newDate
  }));
}; //addSession

export const setCorrectDateForInputGroups = (e, stateFn, [field, key]) => {
  const date = e.target.value.split("-").reverse();

  const newDate = `${ getDay(date[0]) } ${ months.get(date[1]) } ${ date[2] } г.`;
  stateFn(prevState => ({
    ...prevState,
    [field]:  {
      ...prevState[field], [key]: newDate
    }
  }));
}; //updateSession
