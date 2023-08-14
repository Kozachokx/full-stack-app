import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditSaveButtons({
  handleOnDeleteClick,
  handleOnSave,
  handleOnEditClick,
  // handleTurnEditMode,
  props
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditMode(true);
    // handleTurnEditMode(true);
    handleOnEditClick(true);
  };

  const handleSave = () => {
    const result = handleOnSave();
    
    setIsEditMode(false);
    // handleTurnEditMode(false);
    handleOnEditClick(false);
  };

  const handleReset = () => {
    setIsEditMode(false);
    // handleTurnEditMode(false);
    handleOnEditClick(false);
  };

  const handleDelete = () => {
    const response = confirm("Are you sure you want to delete review?");

    if (response) {
      // Handle delete functionality here
      console.log("Ok was pressed");
      handleOnDeleteClick();
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="btn-edit-wrapper">
      {!isEditMode ? (
        <>
        <div>
          <button className="btn btn-edit" onClick={goBack}>
            Back
          </button>
        </div>
        <div className="btn-block-stick-right">
          <button className="btn btn-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-cancel" onClick={handleDelete}>
            Delete
          </button>
        </div>
        </>
      ) : (
        <div className="btn-block-stick-right">
          <button className="btn btn-save" onClick={handleSave} disabled={props.saveButtonIsDisabled}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={handleReset}>
            Cancel
          </button>
        </div>
      )}
      {/* <button className="btn" onClick={handleLogValues}>Log Values</button> */}
    </div>
  );
}
