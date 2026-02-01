import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Avatar({ user }) {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className="sidebar__avatar">
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="sidebar__avatar-image"
        />
      ) : (
        <div className="sidebar__avatar-placeholder">
          {getInitial(user?.name)}
        </div>
      )}
    </div>
  );
}

function Sidebar({ handleLogout, handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="Sidebar">
      <div className="Sidebar__user-section">
        <Avatar user={currentUser} />
        <p className="Sidebar__user-name">{currentUser?.name || "User"}</p>
      </div>
      <div className="sidebar__button-container">
        <button
          onClick={handleEditProfileClick}
          className="Sidebar__edit-button sidebar__button"
          type="button"
        >
          Edit profile
        </button>
        <button
          onClick={handleLogout}
          className="Sidebar__logout-button sidebar__button"
          type="button"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
