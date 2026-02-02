import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];
  return (
    <div className="ClothesSection">
      Your items
      <button
        onClick={handleAddClick}
        className="ClothesSection__add-clothes-btn"
      >
        + Add new
      </button>
      <ul className="ClothesSection__cards-list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              itemProp={item}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
