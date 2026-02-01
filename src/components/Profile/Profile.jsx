import "./Profile.css";

import Sidebar from "../Sidebar/Sidebar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleLogout,
  handleEditProfileClick,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <Sidebar
        handleLogout={handleLogout}
        handleEditProfileClick={handleEditProfileClick}
      />

      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        handleCardLike={handleCardLike}
      />
    </div>
  );
}

export default Profile;
