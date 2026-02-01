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
    avatarUrl: currentUser?.avatarUrl || "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const { name, avatarUrl } = values;

  // Update form values when modal opens or currentUser changes
  useEffect(() => {
    if (activeModal === "edit-profile") {
      setValues({
        name: currentUser?.name || "",
        avatarUrl: currentUser?.avatarUrl || "",
      });
    }
  }, [activeModal, currentUser, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onEdit({ name, avatarUrl });
  }
  // Form state
  // const [name, setName] = useState("");
  // const [avatar, setAvatar] = useState("");

  // Pre-fill form with current user data when modal opens
  // useEffect(() => {
  //   if (activeModal === "edit-profile") {
  //     setName(currentUser.name);
  //     setAvatar(currentUser.avatar);
  //   }
  // }, [activeModal, currentUser]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdateProfile({ name, avatar });
  // };

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
        name="avatarUrl"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
