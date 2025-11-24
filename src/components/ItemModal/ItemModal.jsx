import "./ItemModal.css";
function ItemModal({ activeModal, card, handleCloseClick, handleDeleteItem }) {
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
          <button onClick={handleDeleteItem} className="modal__delete-button">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
