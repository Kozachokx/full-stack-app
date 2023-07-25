import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditSaveButtons({
  handleOnDeleteClick,
  handleLogValues,
  handleOnEditClick,
  handleTurnEditMode,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditMode(true);
    handleTurnEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleReset = () => {
    setIsEditMode(false);
    handleTurnEditMode(false);
  };

  const handleDelete = () => {
    const response = confirm("Are you sure you want to delete review?");

    if (response) {
      // Handle delete functionality here
      handleOnDeleteClick();
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="flex self-center w-77 content-right gap-10 m-bottom-8">
      {!isEditMode ? (
        <>
          <button className="btn btn-edit" onClick={goBack}>
            Back
          </button>
          <button className="btn btn-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-cancel" onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={handleReset}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
