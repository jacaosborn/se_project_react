import "./ModalWithForm.css";
function ModalWithForm({
  titleText,
  children,
  buttonText,
  activeModal,
  handleCloseClick,
  isOpen,
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
        <form name={name} className="modal__form">
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
