import useForm from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({ isOpen, onAddItem, handleCloseClick }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  function handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    };
    onAddItem(newItem).then(() => {
      setValues(defaultValues);
    });
  }
  return (
    <ModalWithForm
      titleText="New garment"
      onSubmit={handleSubmit}
      buttonText="Add garment"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
    >
      <label className="modal__input-label" htmlFor="name">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />

      <label className="modal__input-label" htmlFor="image-url">
        Image URL
      </label>
      <input
        className="modal__input"
        type="url"
        name="imageUrl"
        id="image-url"
        placeholder="Image URL"
        value={values.imageUrl}
        onChange={handleChange}
        required
      />
      <div className="modal__radio-container">
        <p className="modal__input-label">Select the weather type:</p>
        <label className="modal__radio">
          <input
            className="modal__radio-btn"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            id="hot"
            required
          />
          <span className="modal__radio-text">Hot</span>
        </label>
        <label className="modal__radio">
          <input
            className="modal__radio-btn"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
            id="warm"
          />
          <span className="modal__radio-text">Warm</span>
        </label>
        <label className="modal__radio">
          <input
            className="modal__radio-btn"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
            id="cold"
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
