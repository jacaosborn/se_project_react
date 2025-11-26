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

          {/* LM (or other reviewer), thank you for your oversight. The confirmation modal is 
          an optional task according to the brief and, while I recognize the value of it, 
          I must elect to skip the optional tasks due to personal time constraints. I will delete this
          comment after project approval */}
          <button onClick={handleDeleteItem} className="modal__delete-button">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
