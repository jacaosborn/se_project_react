import WeatherCard from "../WeatherCard/WeatherCard.jsx";

import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
function Main({ weatherData, handleCardClick, clothingItems, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__cards">
        <p className="main__weather-statement">
          Today is {weatherData.temp[currentTemperatureUnit]}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="main__cards-list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .reverse()
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  itemProp={item}
                  onCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
