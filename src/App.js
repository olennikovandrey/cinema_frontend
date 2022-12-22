import Main from "./components/Main/Main";
import MovieItem from "./components/MovieItem/MovieItem";
import Room from "./components/Room/Room";
import BuyTickets from "./components/BuyTickets/BuyTickets";
import SelectCinema from "./components/SelectCinema/SelectCinema";
import { Routes, Route } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/movies/id/:id" element={ <MovieItem /> } />
        <Route path="/room/id/cinemaId=:cinemaId/roomId=:roomId/movieId=:movieId" element={ <Room /> } />
        <Route path="/buytickets" element={ <BuyTickets /> } />
        <Route path="/selectcinema" element={ <SelectCinema /> } />
        <Route path="/" element={ <Main /> } />
      </Routes>
    </>
  );
};

export default App;
