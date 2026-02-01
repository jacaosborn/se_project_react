import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Avatar({ user }) {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="header__avatar">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} className="avatar__image" />
      ) : (
        <div className="header__avatar-placeholder">
          {getInitial(user.name)}
        </div>
      )}
    </div>
  );
}

function Header({
  handleAddClick,
  handleLoginClick,
  handleSignUpClick,
  weatherData,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo-details-container">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </NavLink>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__add-and-user-container">
        <ToggleSwitch />
        {currentUser ? (
          <>
            <button
              type="button"
              onClick={handleAddClick}
              className="header__text-btn"
            >
              + Add clothes
            </button>
            <NavLink to="/profile" className="header__profile-nav-link">
              <div className="header__user-container">
                <button className="header__profile-section">
                  <p className="header__user-name">{currentUser.name}</p>
                  <Avatar user={currentUser} />
                </button>
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSignUpClick}
              className="header__text-btn"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={handleLoginClick}
              className="header__text-btn"
            >
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
