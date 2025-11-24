import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              itemProp={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
