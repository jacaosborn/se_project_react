import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({
  activeModal,
  card,
  handleCloseClick,
  handleDeleteItem,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser && card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwner ? "" : "modal__delete-button_hidden"
  }`;
  return (
    <div
      className={`modal ${
        activeModal === "cardPreview" ? "modal__is-open" : ""
      }`}
    >
      <div className="modal__content modal__content_type_image ">
        <button
          onClick={handleCloseClick}
          className="modal__close-button"
          type="button"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__text">
          <div className="modal__text_item-details">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            onClick={handleDeleteItem}
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
