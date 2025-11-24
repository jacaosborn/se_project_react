import "./ItemCard.css";
function ItemCard({ itemProp, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(itemProp);
  };
  return (
    <li className="card">
      <h2 className="card__name">{itemProp.name}</h2>
      <img
        onClick={handleCardClick}
        src={itemProp.imageUrl}
        alt={itemProp.name}
        className="card__image"
      />
    </li>
  );
}
export default ItemCard;
