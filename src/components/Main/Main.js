/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { checkIsAuthFetch } from "./main.api";
import Movies from "../Movies/Movies";
import Header from "../Header/Header";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Search from "../Search/Search";
import AdminSettings from "../AdminSettings/AdminSettings";
import { CHECK_IS_USER_AUTHORIZED, CHECK_IS_USER_ADMIN } from "../../store/actions/action-types";
import Profile from "../Profile/Profile";
import Loader from "../Loader/Loader";
import { userRole } from "../../constants/constants";
import CinemaMain from "../CinemaMain/CinemaMain";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Main = () => {
  const isAdminModalOpen = useSelector(state => state.isAdminModalOpen);
  const isLoader = useSelector(state => state.isLoader);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return (
    <div>
      { isLoader && <Loader /> }
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
