import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeButtonLiked from "../../assets/likeButtonLiked.png";
import likeButtonUnliked from "../../assets/likeButtonUnliked.png";

function ItemCard({ itemProp, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(itemProp);
  };

  const handleLike = () => {
    handleCardLike({ id: itemProp._id, isLiked: isLiked });
  };

  // Check if the item was liked by the current user
  const isLiked =
    currentUser &&
    itemProp.likes &&
    itemProp.likes.some((id) => id === currentUser._id);

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{itemProp.name}</h2>
        {currentUser && (
          <button
            onClick={handleLike}
            className="card__like-button"
            type="button"
          >
            <img
              src={isLiked ? likeButtonLiked : likeButtonUnliked}
              alt={isLiked ? "Unlike" : "Like"}
              className="card__like-button-image"
            />
          </button>
        )}
      </div>
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
