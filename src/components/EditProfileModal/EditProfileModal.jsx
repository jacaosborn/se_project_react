import useForm from "../../hooks/useForm";
import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({
  activeModal,
  onClose,
  isLoading,
  handleCloseClick,
  isOpen,
  onEdit,
}) {
  const currentUser = useContext(CurrentUserContext);
  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const { name, avatar } = values;

  // Update form values when modal opens or currentUser changes
  useEffect(() => {
    if (activeModal === "edit-profile") {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [activeModal, currentUser, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onEdit({ name, avatar });
  }

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
      modalName="edit-profile"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
    >
      <label htmlFor="profile-name" className="modal__input-label">
        Name *
      </label>
      <input
        type="text"
        className="modal__input"
        id="profile-name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleChange}
        minLength="1"
        maxLength="30"
        required
      />

      <label htmlFor="profile-avatar" className="modal__input-label">
        Avatar *
      </label>
      <input
        type="url"
        className="modal__input"
        id="profile-avatar"
        name="avatar"
        placeholder="Avatar URL"
        value={avatar}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
