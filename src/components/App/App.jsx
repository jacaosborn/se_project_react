import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";

import ItemModal from "../ItemModal/ItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { getWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import { filterWeatherData } from "../../utils/weatherApi.js";

import { BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Profile from "../Profile/Profile.jsx";
import { register, login, checkToken } from "../../utils/auth.js";

import {
  getInitialItems,
  addItem,
  removeItem,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      // Token exists, but is it still valid?
      checkToken(token)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((userData) => {
          // Token is valid - Log user in automatically
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          // Token is invalid or expired
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt"); // Clean up bad token
        });
    }
  }, []);
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleSignUpClick = () => {
    setActiveModal("registration-form");
  };
  const handleLoginClick = () => {
    setActiveModal("login-form");
  };

  const handleSecondaryClick = () => {
    if (activeModal === "login-form") {
      setActiveModal("registration-form");
    } else {
      setActiveModal("login-form");
    }
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser("");
    setIsLoggedIn(false);
  };
  const handleCardClick = (card) => {
    setActiveModal("cardPreview");
    setSelectedCard(card);
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const onAddItem = (formInputs) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: formInputs.name,
      imageUrl: formInputs.imageUrl,
      weather: formInputs.weather,
    };
    return addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
      })
      .then(closeActiveModal)

      .catch(console.error);
  };
  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    removeItem(selectedCard._id, token)
      .then(() => {
        closeActiveModal();
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
      })
      .catch(console.error);
  };
  const onLogin = (formInputs, setIsPasswordInvalid) => {
    login(formInputs)
      .then((data) => {
        // Store the token
        localStorage.setItem("jwt", data.token);

        // Update app state - user is now logged in
        setCurrentUser(data.user);
        setIsLoggedIn(true);

        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login failed:", err);
        if (setIsPasswordInvalid) {
          setIsPasswordInvalid(true);
        }
      });
  };

  const onRegistration = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then((data) => {
        // Store the token
        localStorage.setItem("jwt", data.token);

        // Update app state - user is now logged in
        setCurrentUser(data.user);
        setIsLoggedIn(true);

        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const onEdit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editProfile({ name, avatar }, token)
      .then((data) => {
        setCurrentUser(data);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getInitialItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                handleLoginClick={handleLoginClick}
                handleSignUpClick={handleSignUpClick}
                weatherData={weatherData}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardLike={handleCardLike}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        handleLogout={handleLogout}
                        handleEditProfileClick={handleEditProfileClick}
                        handleCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              name="add-garment"
              handleCloseClick={closeActiveModal}
              onAddItem={onAddItem}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              handleCloseClick={closeActiveModal}
              isOpen={activeModal === "cardPreview"}
              handleDeleteItem={handleDeleteItem}
              handleCardLike={handleCardLike}
            />
            <RegisterModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              isOpen={activeModal === "registration-form"}
              onRegistration={onRegistration}
              handleSecondaryClick={handleSecondaryClick}
            />
            <LoginModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              isOpen={activeModal === "login-form"}
              onLogin={onLogin}
              handleSecondaryClick={handleSecondaryClick}
            />
            <EditProfileModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              isOpen={activeModal === "edit-profile"}
              onEdit={onEdit}
              handleSecondaryClick={handleSecondaryClick}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
