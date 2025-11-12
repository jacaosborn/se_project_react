import "./ModalWithForm.css";
function ModalWithForm({
  titleText,
  children,
  buttonText,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "add-garment" ? "modal__is-open" : ""
      }`}
    >
      <div className="modal__container">
        <button
          onClick={handleCloseClick}
          className="modal__close-button"
          type="button"
        ></button>
        <h2 className="modal__title">{titleText}</h2>
        <form className="modal__form">
          {children}
          <button className="modal__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
