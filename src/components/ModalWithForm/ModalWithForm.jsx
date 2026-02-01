import "./ModalWithForm.css";
function ModalWithForm({
  titleText,
  children,
  buttonText,
  name,
  handleCloseClick,
  isOpen,
  onSubmit,
  secondaryButton,
  handleSecondaryClick,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__is-open" : ""}`}
    >
      <div className="modal__container">
        <button
          onClick={handleCloseClick}
          className="modal__close-button"
          type="button"
        ></button>
        <h2 className="modal__title">{titleText}</h2>
        <form onSubmit={onSubmit} name={name} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button className="modal__save-button" type="submit">
              {buttonText}
            </button>
            <p
              className="modal__secondary-button"
              onClick={handleSecondaryClick}
            >
              {secondaryButton}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
