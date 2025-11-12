import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__weather-statement">
          Today is {weatherData.temp.F}° F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  itemProp={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
