import "./WeatherCard.css";
import sunny from "../../assets/sunny-card.png";
function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__text">{weatherData.temp.F}° F</p>
      <img src={sunny} alt="Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
