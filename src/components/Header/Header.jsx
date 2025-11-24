import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
function Header({ handleAddClick, weatherData }) {
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
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <NavLink to="/profile" className="header__profile-nav-link">
          <div className="header__user-container">
            <button className="header__profile-section">
              <p className="header__user-name">Terrence Tegegne</p>
              <img className="header__avatar" src={avatar} alt="User Avatar" />
            </button>
          </div>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
