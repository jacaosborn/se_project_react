import "./ItemModal.css";
function ItemModal({ activeModal, card, handleCloseClick }) {
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
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__text">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
