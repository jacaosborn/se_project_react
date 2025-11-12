import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo-details-container">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__add-and-user-container">
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <button className="header__profile-section">
            <p className="header__user-name">Terrence Tegegne</p>
            <img className="header__avatar" src={avatar} alt="User Avatar" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
