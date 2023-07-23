import React, { useState } from "react";

export default function EditSaveButtons({ handleLogValues }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleReset = () => {
    setIsEditMode(false);
  };

  const handleDelete = () => {
    // Handle delete functionality here
  };

  return (
    <div>
      {!isEditMode ? (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleReset}>Reset</button>
        </>
      )}
      <button onClick={handleLogValues}>Log Values</button>
    </div>
  );
}
