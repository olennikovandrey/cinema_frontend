import DeleteUser from "./AdminItems/Users/DeleteUser/DeleteUser";
import AddMovie from "./AdminItems/Movies/AddMovie/AddMovie";
import DeleteMovie from "./AdminItems/Movies/DeleteMovie/DeleteMovie";
import UpdateMovie from "./AdminItems/Movies/UpdateMovie/UpdateMovie";
import AddCinema from "./AdminItems/Cinemas/AddCinema/AddCinema";
import DeleteCinema from "./AdminItems/Cinemas/DeleteCinema/DeleteCinema";
import AddSession from "./AdminItems/Sessions/AddSession/AddSession";
import UpdateSession from "./AdminItems/Sessions/UpdateSession/UpdateSession";
import DeleteSession from "./AdminItems/Sessions/DeleteSession/DeleteSession";
import navigationGroups from "./navigationGroups";
import { CHECK_IS_ADMIN_MODAL_OPEN } from "../../store/actions/action-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const NavigationGroup = ({ headline, navigations, checkedAction, handleClick }) => {
  const header = <h4>{ headline }</h4>;
  const navList = navigations.map(({ name, title }) =>
    <nav
      key={ title + name }
      className={ name === checkedAction ? "checked" : null }
      name={ name }
      onClick={ e => handleClick(e.target.attributes.name.value) }
    >{ title }</nav>
  );

  return <div className="admin-navigation__group">
    { [header, navList] }
  </div>;
};

const NavigationGroupAdaptive = ({ navigationGroups, handleClick }) => {
  return (
    <select className="admin-navigation__group-adaptive" onChange={ e => handleClick(e.target.value) }>
      { navigationGroups.map((item, index) =>
        <optgroup label={ item.headline } key={ item.headline + index }>
          { item.navigations.map(({ name, title }) =>
            <option
              key={ item.name + name }
              value={ name }
            >{ title }</option>
          ) }
        </optgroup>
      ) }
    </select>
  );
};

const settingsField = Object.freeze({
  userList: "userList",
  addCinema: "addCinema",
  deleteCinema: "deleteCinema",
  addMovie: "addMovie",
  deleteMovie: "deleteMovie",
  updateMovie: "updateMovie",
  addSession: "addSession",
  updateSession: "updateSession",
  deleteSession: "deleteSession",
});

const adminItemEl = new Map()
  .set(settingsField.userList, <DeleteUser />)
  .set(settingsField.addCinema, <AddCinema />)
  .set(settingsField.deleteCinema, <DeleteCinema />)
  .set(settingsField.addMovie, <AddMovie />)
  .set(settingsField.deleteMovie, <DeleteMovie />)
  .set(settingsField.updateMovie, <UpdateMovie />)
  .set(settingsField.addSession, <AddSession /> )
  .set(settingsField.updateSession, <UpdateSession /> )
  .set(settingsField.deleteSession, <DeleteSession /> );

const AdminSettings = () => {
  const [checkedAction, setCheckedAction] = useState("userList");

  const isAdminModalOpen = useSelector(state => state.isAdminModalOpen);
  const dispatch = useDispatch();

  return (
    <div
      className="admin-settings-wrapper"
      style={ isAdminModalOpen ? { opacity: 1 } : null }
    >
      <div className="admin-work-fields">
        <aside className="admin-navigation">
          <h3 className="admin-navigation__title">Выберите действие</h3>
          { navigationGroups.map((item, index) => {
            const { headline, navigations } = item;
            return (
              <NavigationGroup
                key={ headline + index }
                headline={ headline }
                navigations={ navigations }
                checkedAction={ checkedAction }
                handleClick={ setCheckedAction }/>
            );
          }) }
          { <NavigationGroupAdaptive
            navigationGroups={ navigationGroups }
            checkedAction={ checkedAction }
            handleClick={ setCheckedAction }
          />
          }
        </aside>
        { checkedAction && <section className="admin-item">
          { adminItemEl.get(checkedAction) }
        </section>
        }
        <span
          className="admin-close-button"
          onClick={ () => dispatch({ type: CHECK_IS_ADMIN_MODAL_OPEN, payload: false }) }
        ></span>
      </div>
    </div>
  );
};

export default AdminSettings;

NavigationGroup.propTypes = {
  headline: PropTypes.string,
  navigations: PropTypes.array,
  checkedAction: PropTypes.string,
  handleClick: PropTypes.func
};

NavigationGroupAdaptive.propTypes = {
  navigationGroups: PropTypes.array,
  handleClick: PropTypes.func
};
