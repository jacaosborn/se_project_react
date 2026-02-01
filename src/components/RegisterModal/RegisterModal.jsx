import useForm from "../../hooks/useForm";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const RegisterModal = ({
  isOpen,
  onRegistration,
  handleCloseClick,
  handleSecondaryClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const handleEmailChange = (e) => {
    handleChange(e);
    setIsEmailInvalid(!isValidEmail(e.target.value) && e.target.value !== "");
  };

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password, name, avatarUrl } = values;
    if (!isValidEmail(email)) {
      setIsEmailInvalid(true);
      return;
    }
    onRegistration({ email, password, name, avatarUrl });
  }

  return (
    <ModalWithForm
      titleText="Sign up"
      onSubmit={handleSubmit}
      buttonText="Next"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      secondaryButton="or Log in"
      handleSecondaryClick={handleSecondaryClick}
    >
      <label
        className={`modal__input-label ${
          isEmailInvalid ? "modal__input-label--invalid" : ""
        }`}
        htmlFor="email"
      >
        Email* {isEmailInvalid && "(this is not an email address)"}
      </label>
      <input
        className={`modal__input ${
          isEmailInvalid ? "modal__input--invalid" : ""
        }`}
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={values.email}
        onChange={handleEmailChange}
        required
      />
      <label className="modal__input-label" htmlFor="password">
        Password*
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        required
      />
      <label className="modal__input-label" htmlFor="name">
        Name*
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
      <label className="modal__input-label" htmlFor="avatar-url">
        Avatar URL*
      </label>
      <input
        className="modal__input"
        type="url"
        name="avatarUrl"
        id="avatar-url"
        placeholder="Avatar URL"
        value={values.avatarUrl}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
