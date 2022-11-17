/* eslint-disable no-console */
import { searchFetch } from "./search.api";
import { CHECK_IS_SEARCH_MODAL_OPEN, SET_MOVIES, SET_RANDOM_MOVIES } from "../../store/actions/action-types";
import DropDown from "../DropDown/DropDown";
import { searchOptionValues, baseUrl, urls } from "../../constants/constants";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Search = () =>  {
  const [searchValue, setSearchValue] = useState("");
  const [searchCriterion, setSearchCriterion] = useState("title");
  const isSearchModalOpen = useSelector(state => state.isSearchModalOpen);
  const cashedMovies = useSelector(state => state.cashedMovies);
  const russianCriterion = searchOptionValues.filter(item => item.criterion === searchCriterion)[0].value;
  const dispatch = useDispatch();

  const randomFiller = movies => {
    const indexes = movies.map(() => Math.floor(Math.random() * movies.length));
    const uniqueIndexes = [ ...new Set(indexes)];
    uniqueIndexes.length = 6;
    const uniqueResults = uniqueIndexes.map(index => movies[index]);
    dispatch({ type: SET_RANDOM_MOVIES, payload: uniqueResults });
  };
  const urlWithCriterions = `${ baseUrl }/movies/${ searchCriterion }/${ searchCriterion }=${ searchValue }`;

  const handleSearch = async (e, url) => {
    e.preventDefault();
    try {
      const movies = await searchFetch(url);
      randomFiller(cashedMovies);
      dispatch({ type: SET_MOVIES, payload: movies });
      dispatch({ type: CHECK_IS_SEARCH_MODAL_OPEN, payload: false });
    } catch (e) {
      console.log(e);
      dispatch({ type: SET_MOVIES, payload: [] });
    }
  };

  return (
    <div
      className={ `search-form-wrapper  ${ isSearchModalOpen ? "visible" : "hidden" }` }
      onMouseLeave={ () => dispatch({ type: CHECK_IS_SEARCH_MODAL_OPEN, payload: false }) }
    >
      <form className="search-form" onSubmit={ e => handleSearch(e, urlWithCriterions)}>
        <input
          className="search-form__input"
          placeholder="Введите поисковый запрос"
          type="text"
          value={ searchValue }
          onChange={ e => setSearchValue(e.target.value) }
        />
        <DropDown
          stateFunc={ setSearchCriterion }
          optionValues={ searchOptionValues }
          preClassName="search"
          checkedValue={ russianCriterion }
        />
        <button
          className="search-form__button"
          type="submit"
        >
          Искать
        </button>
        <button
          className="search-form__button"
          type="button"
          onClick={ e => handleSearch(e, urls.getAllMovies) }
        >
          Показать все
        </button>
        <span
          className="close-button"
          onClick={ () => dispatch({ type: CHECK_IS_SEARCH_MODAL_OPEN, payload: false }) }
        ></span>
      </form>
    </div>
  );
};

export default Search;
