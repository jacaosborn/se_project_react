import avatar from "../../assets/avatar.png";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Sidebar__user-section">
        <img className="Sidebar__avatar" src={avatar} alt="User Avatar" />
        <p className="Sidebar__user-name">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default Sidebar;
