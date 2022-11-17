export const handleBlur = (e, stateFn, stateField) => {
  stateFn(prevState => ({
    ...prevState,
    [stateField]: e.target.value
  }));
}; //addMovie, addCinema

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
    [movieField]:  {
      ...prevState[movieField], [movieFieldKey]: e.target.innerText === "" ? prevState : e.target.innerText
    }
  }));
}; //updateMovie