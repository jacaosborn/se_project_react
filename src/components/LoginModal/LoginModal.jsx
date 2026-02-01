import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginModal = ({
  isOpen,
  activeModal,
  onLogin,
  handleCloseClick,
  handleSecondaryClick,
  onLoginError,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  // Reset password error when modal opens
  useEffect(() => {
    if (activeModal === "login-form") {
      setIsPasswordInvalid(false);
    }
  }, [activeModal]);

  const handleEmailChange = (e) => {
    handleChange(e);
    setIsEmailInvalid(!isValidEmail(e.target.value) && e.target.value !== "");
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    setIsPasswordInvalid(false);
  };

  function handleSubmit(event) {
    const { email, password } = values;
    event.preventDefault();
    if (!isValidEmail(email)) {
      setIsEmailInvalid(true);
      return;
    }
    onLogin({ email, password }, setIsPasswordInvalid);
    setValues(defaultValues);
  }
  return (
    <ModalWithForm
      titleText="Login"
      onSubmit={handleSubmit}
      buttonText="Login"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      secondaryButton="or Register"
      handleSecondaryClick={handleSecondaryClick}
    >
      <label
        className={`modal__input-label ${
          isEmailInvalid ? "modal__input-label--invalid" : ""
        }`}
        htmlFor="email"
      >
        Email {isEmailInvalid && "(this is not an email address)"}
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
      <label
        className={`modal__input-label ${
          isPasswordInvalid ? "modal__input-label--invalid" : ""
        }`}
        htmlFor="password"
      >
        {isPasswordInvalid ? "Incorrect password" : "Password"}
      </label>
      <input
        className={`modal__input ${
          isPasswordInvalid ? "modal__input--invalid" : ""
        }`}
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={values.password}
        onChange={handlePasswordChange}
        required
      />
    </ModalWithForm>
  );
};

export default LoginModal;
