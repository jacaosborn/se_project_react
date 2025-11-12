import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import { filterWeatherData } from "../../utils/weatherApi.js";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setActiveModal("cardPreview");
    setSelectedCard(card);
  };
  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.err);
  }, []);
  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        titleText="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
      >
        <label className="modal__input-label" htmlFor="Name">
          Name
        </label>
        <input className="modal__input" type="text" placeholder="Name" />

        <label className="modal__input-label" htmlFor="Image URL">
          Image
        </label>
        <input className="modal__input" type="url" placeholder="Image URL" />
        <div className="modal__radio-container">
          <p className="modal__input-label">Select the weather type:</p>
          <label className="modal__radio">
            <input
              className="modal__radio-btn"
              type="radio"
              name="weather"
              value="hot"
              id="hot"
            />
            <span className="modal__radio-text">Hot</span>
          </label>
          <label className="modal__radio">
            <input
              className="modal__radio-btn"
              type="radio"
              name="weather"
              value="warm"
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
              id="cold"
            />
            <span className="modal__radio-text">Cold</span>
          </label>
        </div>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      />
    </div>
  );
}

export default App;
