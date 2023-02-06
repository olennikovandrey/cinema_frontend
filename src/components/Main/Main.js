/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { checkIsAuthFetch } from "./main.api";
import Movies from "../Movies/Movies";
import Header from "../Header/Header";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Search from "../Search/Search";
import AdminSettings from "../AdminSettings/AdminSettings";
import { CHECK_IS_USER_AUTHORIZED, CHECK_IS_USER_ADMIN, SET_IS_PAYMENT_SUCCESS, SET_USER_ID } from "../../store/actions/action-types";
import Profile from "../Profile/Profile";
import Loader from "../Loader/Loader";
import { userRole, baseWebSocketUrl } from "../../constants/constants";
import CinemaMain from "../CinemaMain/CinemaMain";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

export const socket = io(baseWebSocketUrl);

const Main = () => {
  const isAdminModalOpen = useSelector(state => state.isAdminModalOpen);
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_IS_PAYMENT_SUCCESS, payload: false });
    async function checkIsAuthorized() {
      try {
        const { isAuth, role } = await checkIsAuthFetch();
        isAuth && dispatch({ type: CHECK_IS_USER_AUTHORIZED });
        role === userRole.admin && dispatch({ type: CHECK_IS_USER_ADMIN, payload: true });
      } catch (e) {
        console.log(e);
      }
    }
    checkIsAuthorized();

    socket.on("connect", () => {
      dispatch({ type: SET_USER_ID, payload: socket.id });
    });
  }, []);

  return (
    <div>
      { isLoaderOpen && <Loader /> }
      <Header />
      {
        !isAdminModalOpen ?
          <>
            <LoginForm />
            <RegisterForm />
            <Search />
            <Profile />
            <CinemaMain />
            <Movies />
          </> :
          <AdminSettings />
      }
    </div>
  );
};

export default Main;
